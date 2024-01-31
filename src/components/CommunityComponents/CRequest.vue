<template>
  <div class="bg-white dark:bg-gray-800 rounded-3xl w-full p-4">
    <div class="flex flex-col gap-4 w-full xs:w-3/4 mx-auto">
      <div
        class="text-center text-2xl font-semibold text-gray-800 dark:text-gray-200"
      >
        {{ community.name }}
      </div>
      <div class="w-full flex justify-center">
        <div
          class="inline-block text-center text-md text-gray-900 dark:text-gray-100 font-regular bg-blue-50 dark:bg-blue-900 py-1 px-2 rounded-md"
        >
          {{ community.description }}
        </div>
      </div>
      <!-- Message -->
      <div :class="{ 'has-error': v$.message.$dirty && v$.message.$invalid }">
        <TextAreaField
          id="message"
          v-model="message"
          name="message"
          :placeholder="$t('placeholder.community_request_desc')"
          :rows="2"
          :is-valid="v$.message.$dirty ? !v$.message.$error : undefined"
        />

        <!-- Error message for Message -->
        <div
          v-if="v$.message.$dirty && v$.message.$invalid"
          class="text-red-500 text-center"
        >
          <div
            v-if="v$.message.required.$invalid"
            class="text-error text-sm"
          >
            {{ v$.message.required.$message }}
          </div>
          <div
            v-if="v$.message.maxLength.$invalid"
            class="text-error text-sm"
          >
            {{ v$.message.maxLength.$message }}
          </div>
        </div>
      </div>

      <div
        v-if="community.location"
        class="justify-center flex items-center text-sm text-gray-500"
      >
        <LocationIcon class="h-5 mr-1 fill-black dark:fill-white" />
        {{ community.location }}
      </div>

      <!-- Send request button -->
      <ColorButton
        class="mx-auto"
        :text="$t('button.community.send_req')"
        @click="saveClicked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, helpers } from "@vuelidate/validators";
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import { sendCommunityJoinRequest } from "@/api/factories/CommunityRequestFactory";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import LocationIcon from "@/components/IconComponents/LocationIcon.vue";
import TextAreaField from "@/components/BaseComponents/TextAreaField.vue";
import { Community, CommunityRequestCreation } from "@/types/entities";

const notification = useNotification();
const { t } = useI18n();

const props = defineProps<{
  community: Community;
}>();

const emit = defineEmits<{
  closesModal: [];
}>();

const message = ref<string>("");

const rules = {
  message: {
    required: helpers.withMessage(() => t("errors.message_empty"), required),
    maxLength: helpers.withMessage(
      () => t("errors.message_max"),
      maxLength(200),
    ),
  },
};

const v$ = useVuelidate(rules, { message });

async function saveClicked() {
  await v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  const communityRequest: CommunityRequestCreation = {
    message: message.value.trim(),
  };
  await sendCommunityJoinRequest(props.community.communityID, communityRequest);
  emit("closesModal");
  notification.notify({
    type: "success",
    title: t("notification.request.sent"),
  });
}
</script>
