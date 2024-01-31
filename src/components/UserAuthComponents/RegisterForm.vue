<template>
  <!-- Register form for creating a new user account -->
  <div class="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-4">
    <form class="w-full xs:w-3/4 mx-auto flex flex-col gap-4">
      <IHeader @click="$emit('closesModal')" />
      <div class="flex justify-between">
        <div>
          <!-- First name -->
          <InputField
            id="firstName"
            v-model="firstName"
            name="firstName"
            type="text"
            :placeholder="$t('placeholder.name.first')"
            :is-valid="v$.firstName.$dirty ? !v$.firstName.$error : null"
            @enter="submit"
          />
          <!-- error message for first name-->
          <div
            v-for="(error, index) of v$.firstName.$errors"
            :key="index"
            class="text-red-500 text-sm text-center"
          >
            <div
              v-show="showError"
              id="firstNameErrorID"
              class="text-red-500 text-sm"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="ml-2">
          <!-- Last name -->
          <InputField
            id="lastName"
            v-model="lastName"
            type="text"
            name="lastName"
            :placeholder="$t('placeholder.name.last')"
            :is-valid="v$.lastName.$dirty ? !v$.lastName.$error : null"
            @enter="submit"
          />
          <!-- error message for last name -->
          <div
            v-for="(error, index) of v$.lastName.$errors"
            :key="index"
            class="text-red-500 text-sm"
          >
            <div
              v-show="showError"
              id="lastNameErrorID"
              class="text-red-500 text-sm"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- Email -->
        <InputField
          id="email"
          v-model="email"
          type="email"
          name="email"
          :placeholder="$t('placeholder.email')"
          :is-valid="v$.email.$dirty ? !v$.email.$error : null"
          @enter="submit"
        />
        <!-- error message for email -->
        <div
          v-for="(error, index) of v$.email.$errors"
          :key="index"
          class="text-red-500 text-sm text-center"
        >
          <div
            v-show="showError"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div>
        <!-- Password -->
        <InputField
          id="password"
          v-model="password"
          type="password"
          name="password"
          :placeholder="$t('placeholder.password.default')"
          :is-valid="v$.password.$dirty ? !v$.password.$error : null"
          @enter="submit"
        />
        <!-- error message -->
        <div
          v-for="(error, index) of v$.password.$errors"
          :key="index"
          class="text-red-500 text-sm text-center"
        >
          <div
            v-show="showError"
            id="passwordErrorID"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>

      <div>
        <InputField
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          name="confirmPassword"
          :placeholder="$t('placeholder.password.confirm')"
          :is-valid="
            v$.confirmPassword.$dirty ? !v$.confirmPassword.$error : null
          "
          @enter="submit"
        />
        <!-- error message -->
        <div
          v-for="(error, index) of v$.confirmPassword.$errors"
          :key="index"
          class="text-red-500 text-sm text-center"
        >
          <div
            v-show="showError"
            id="confirmPasswordErrorID"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div>
        <!-- Address -->
        <GeoSearchBar
          :is-valid="v$.address.$dirty ? !v$.address.$error : null"
          @location-selected="onLocationSelected"
          @clickup.enter="submit()"
        />
        <!-- error message for address -->
        <div
          v-for="(error, index) of v$.address.$errors"
          :key="index"
          class="text-red-500 text-sm"
        >
          <div
            v-show="showError"
            id="addressErrorID"
            class="text-red-500 text-sm text-center"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div class="mx-auto text-center">
        <input
          id="termsCheckbox"
          v-model="termsAccepted"
          type="checkbox"
          name="termsCheckbox"
          class="inline-block mr-2"
        >
        <label
          for="termsCheckbox"
          class="text-[11px] text-black dark:text-white text-center"
        >
          I agree to the Del
          <router-link
            to="/terms"
            class="text-blue-500"
          >Terms of Service</router-link>
          and
          <router-link
            to="/privacy"
            class="text-blue-500"
          >Privacy Policy</router-link>.
        </label>
      </div>
      <ColorButton
        class="mx-auto"
        :text="$t('button.signup')"
        @click="submit"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email as emailValidator,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { login, registerUser } from "@/api/AuthService";
import { useUserStore } from "@/stores/UserStore";
import InputField from "@/components/BaseComponents/InputField";
import ColorButton from "@/components/BaseComponents/ColorButton";
import { useI18n } from "vue-i18n";
import GeoSearchBar from "@/components/SearchComponents/GeoSearchBar";
import IHeader from "@/components/NavigationComponents/IHeader";
import { useNotification } from "@kyvg/vue3-notification";
import { getAdminList } from "@/api/factories/UserCommunityFactory";

const userStore = useUserStore();
const { t } = useI18n();
const notifications = useNotification();

const showError = ref(false);
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const lastName = ref("");
const address = ref("");
const termsAccepted = ref(false);

const coordinates = {
  latitude: null,
  longitude: null,
};

const emits = defineEmits(["closesModal"]);

const rules = {
  email: {
    required: helpers.withMessage(t("errors.empty_field"), required),
    email: helpers.withMessage(t("errors.empty_field"), emailValidator),
  },
  password: {
    required: helpers.withMessage(t("errors.empty_field"), required),
    minLength: helpers.withMessage(t("errors.password_length"), minLength(8)),
  },
  confirmPassword: {
    sameAs: helpers.withMessage(t("errors.password_alike"), sameAs(password)),
    required: helpers.withMessage(t("errors.empty_field"), required),
  },
  firstName: {
    required: helpers.withMessage(t("errors.empty_field"), required),
  },
  lastName: {
    required: helpers.withMessage(t("errors.empty_field"), required),
  },
  address: {
    required: helpers.withMessage(t("errors.empty_field"), required),
  },
};

const v$ = useVuelidate(rules, {
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  address,
});

async function sendRegisterRequest() {
  const userInfo = {
    email: email.value.trim().toLowerCase(),
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    password: password.value,
    coordinates: coordinates,
  };
  const res = await registerUser(userInfo);
  if (res.status === 200) {
    return true;
  } else {
    notifications.notify(res.message);
    return false;
  }
}

async function submit() {
  showError.value = true;
  if (!termsAccepted.value) {
    notifications.notify({
      type: "warn",
      text: "You must accept the Terms of Service and Privacy Policy.",
    });
    return;
  }
  if (!(await v$.value.$validate())) return;
  if (!(await sendRegisterRequest())) return;

  const loginRequest = {
    email: email.value,
    password: password.value,
  };

  const loginResponse = await login(loginRequest);

  if (loginResponse.isLoggedIn) {
    userStore.login(loginResponse.authResponse);
    const adminList = await getAdminList();
    userStore.addAdminList(adminList);
  } else {
    emits("closesModal");
    notifications.notify({
      type: "warn",
      text: t("errors.login.failure"),
    });
  }
}

function onLocationSelected(locationData) {
  coordinates.latitude = locationData.lat;
  coordinates.longitude = locationData.lon;
  address.value = locationData.address;
}
</script>
