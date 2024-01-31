<template>
  <div class="w-full p-4 bg-white dark:bg-gray-900 rounded-3xl">
    <div class="mx-auto w-full xs:w-3/4 flex flex-col gap-4">
      <div
        v-for="(field, index) in ['oldPassword', 'password', 'rePassword']"
        :key="index"
      >
        <InputField
          :id="field"
          v-model="v$.user[field].$model"
          type="password"
          :name="field"
          :placeholder="labels[index]"
          :is-valid="v$.user[field].$dirty ? !v$.user[field].$error : null"
          @enter="saveClicked()"
        />
        <div
          v-for="(error, i) in v$.user[field].$errors"
          :key="i"
        >
          <div
            v-show="showError"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <ColorButton
        class="mx-auto"
        :text="$t('button.new_password')"
        @click="saveClicked()"
      />
      <div
        v-if="message"
        class="flex items-center justify-center text-center bg-gray-50"
      >
        <label class="mx-2 text-sm font-bold text-red-500 hover:underline">{{
          message
        }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { changePassword } from "@/api/factories/UserFactory";
import ColorButton from "@/components/BaseComponents/ColorButton";
import { useUserStore } from "@/stores/UserStore";
import { useI18n } from "vue-i18n";
import { useNotification } from "@kyvg/vue3-notification";
import InputField from "@/components/BaseComponents/InputField";
import { getAdminList } from "@/api/factories/UserCommunityFactory";

const emits = defineEmits(["closesModal"]);

const userStore = useUserStore();
const { t } = useI18n();
const notifications = useNotification();

const message = ref("");
const user = {
  oldPassword: ref(""),
  password: ref(""),
  rePassword: ref(""),
};
const showError = ref(false);
const labels = [
  t("message.change_password.old"),
  t("message.change_password.new"),
  t("message.change_password.repeat"),
];

const rules = {
  user: {
    oldPassword: {
      required: helpers.withMessage(t("errors.empty_field"), required),
    },
    password: {
      required: helpers.withMessage(t("errors.empty_field"), required),
      minLength: helpers.withMessage(t("errors.password_length"), minLength(8)),
    },
    rePassword: {
      sameAs: helpers.withMessage(
        t("errors.password_alike"),
        sameAs(user.password),
      ),
      required: helpers.withMessage(t("errors.empty_field"), required),
    },
  },
};

const v$ = useVuelidate(rules, { user });

async function saveClicked() {
  showError.value = true;
  await v$.value.$validate();

  if (v$.value.$invalid) {
    return;
  }

  const newPassword = {
    newPassword: user.password.value,
    oldPassword: user.oldPassword.value,
  };

  const newPasswordResponse = await changePassword(
    userStore.currentUser.ID,
    newPassword,
  );

  if (newPasswordResponse.correctPassword) {
    message.value = "";
    userStore.login(newPasswordResponse.authResponse);
    const adminList = await getAdminList();
    userStore.addAdminList(adminList);
    emits("closesModal");
    notifications.notify({
      type: "success",
      title: t("notification.password"),
    });
  } else if (!newPasswordResponse.correctPassword) {
    message.value = t("errors.wrong_old_password");
  } else {
    message.value = t("errors.error");
  }
}
</script>
