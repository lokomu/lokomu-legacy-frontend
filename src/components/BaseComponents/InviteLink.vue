<template>
  <div class="bg-white dark:bg-gray-800 w-full rounded-full p-4">
    <div class="flex flex-col items-center">
      <button
        v-if="!inviteLink"
        class="bg-blue-600 text-white px-4 py-2 rounded-3xl"
        @click="createInviteLink"
      >
        {{ $t("button.invite.create") }}
      </button>
      <div
        v-if="inviteLink"
        class="flex w-full"
      >
        <input
          type="text"
          :value="inviteLink"
          readonly
          class="border-2 w-full outline-gray-500 border-gray-300 bg-gray-100 rounded-3xl px-2 py-1 text-gray-800"
        >
        <button
          class="bg-blue-600 text-white px-4 py-1 rounded-3xl ml-2"
          @click="copyInviteLink"
        >
          {{ $t("button.copy") }}
        </button>
      </div>
      <div
        v-if="!inviteLink"
        class="text-black text-center dark:text-white text-sm pt-4"
      >
        {{ $t("message.invite.expiration") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createInvite } from "@/api/factories/InviteFactory";
import { useNotification } from "@kyvg/vue3-notification";
import { useCommunityStore } from "@/stores/CommunityStore";

const notifications = useNotification();
const communityStore = useCommunityStore();

const inviteLink = ref("");
const FRONTURL = import.meta.env.VITE_BASEURL.replace(/:3000\/api\//, ":8080/");

async function createInviteLink() {
  try {
    const response = await createInvite(communityStore.community.ID);
    const inviteID = response.inviteID;
    inviteLink.value = FRONTURL + "invite/" + inviteID;
  } catch (error) {
    notifications.notify({
      type: "error",
      text: "Hmm... something seems to have gone wrong",
    });
  }
}

async function copyInviteLink() {
  try {
    await navigator.clipboard.writeText(inviteLink.value);
    notifications.notify({ type: "success", text: "Link copied to clipboard" });
  } catch (error) {
    notifications.notify({
      type: "warn",
      text: "Could not copy link to clipboard, copy it manually",
    });
  }
}
</script>
