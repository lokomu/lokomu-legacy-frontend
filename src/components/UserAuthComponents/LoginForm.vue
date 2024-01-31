<template>
  <div
    class="rounded-3xl overflow-hidden max-w-md w-full bg-white dark:bg-gray-900"
  >
    <div class="mx-auto w-full xs:w-3/4 flex flex-col gap-4 p-4">
      <IHeader @click="$emit('closesModal')" />
      <!-- Email -->
      <div :class="{ error: v$.user.email.$errors.length }">
        <InputField
          id="loginEmail"
          v-model="v$.user.email.$model"
          type="email"
          name="email"
          :placeholder="t('placeholder.email')"
          :is-valid="v$.user.email.$dirty ? !v$.user.email.$error : null"
          @enter="loginClicked()"
        />
        <!-- error message for email -->
        <div
          v-for="(error, index) of v$.user.email.$errors"
          :key="index"
        >
          <div
            v-show="showError"
            id="emailErrorID"
            class="text-red-500 text-sm text-center"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <!-- Password -->
      <div :class="{ error: v$.user.password.$errors.length }">
        <InputField
          id="loginPassword"
          v-model="v$.user.password.$model"
          type="password"
          name="password"
          :placeholder="t('placeholder.password.default')"
          :is-valid="v$.user.password.$dirty ? !v$.user.password.$error : null"
          @enter="loginClicked()"
        />
        <!-- error message for password -->
        <div
          v-for="(error, index) of v$.user.password.$errors"
          :key="index"
          class="text-red-500 text-sm"
        >
          <div
            v-show="showError"
            id="passwordErrorID"
            class="text-red-500 text-sm text-center"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Button for logging in -->
      <ColorButton
        class="mx-auto"
        button-color="green"
        :text="t('button.login')"
        @click="loginClicked"
      />
      <div
        class="inline-block mx-auto text-blue-700 dark:text-blue-100 text-xs hover:font-bold cursor-pointer"
        @click="emits('openRegister')"
      >
        {{ t("button.signup_message") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { login } from "@/api/AuthService";
import { useUserStore } from "@/stores/UserStore";
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import { useI18n } from "vue-i18n";
import InputField from "@/components/BaseComponents/InputField.vue";
import IHeader from "@/components/NavigationComponents/IHeader.vue";
import { useNotification } from "@kyvg/vue3-notification";
import { getAdminList } from "@/api/factories/UserCommunityFactory";

const emits = defineEmits(["closesModal", "openRegister"]);

const userStore = useUserStore();
const { t } = useI18n();
const notifications = useNotification();

const user = reactive({
  email: "",
  password: "",
});
const showError = ref(false);

const rules = {
  user: {
    email: {
      required: helpers.withMessage(t("errors.login.email_empty"), required),
      email: helpers.withMessage(t("errors.login.email_invalid"), email),
    },
    password: {
      required: helpers.withMessage(t("errors.login.password"), required),
    },
  },
};

const v$ = useVuelidate(rules, { user });

async function loginClicked() {
  showError.value = true;
  v$.value.$touch();
  if (v$.value.$invalid) return;

  const loginRequest = {
    email: user.email.trim().toLowerCase(),
    password: user.password,
  };

  const loginResponse = await login(loginRequest);

  if (loginResponse.isLoggedIn === true) {
    userStore.login(loginResponse.authResponse);
    const adminList = await getAdminList();
    userStore.addAdminList(adminList);
  } else {
    notifications.notify({
      type: "error",
      text: t("errors.login.wrong"),
    });
  }
}
</script>
