<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      {{ $t("title.invite") }}
    </h1>
    <p class="text-xl mb-6 text-gray-600 dark:text-gray-400">
      {{ $t("message.community.invite") }}
    </p>
    <button
      v-if="userStore.isLoggedIn"
      class="bg-floyd-500 rounded-3xl hover:bg-floyd-600 text-white font-bold py-2 px-4"
      @click="acceptInvitation"
    >
      {{ $t("button.invite.accept") }}
    </button>
    <router-link
      v-else
      to="/"
      class="bg-floyd-500 rounded-3xl hover:bg-floyd-600 text-white font-bold py-2 px-4"
    >
      {{ $t("button.invite.login") }}
    </router-link>
    <div
      v-if="!userStore.isLoggedIn"
      class="relative mt-4"
    >
      <div
        class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow-md text-sm text-gray-600 dark:text-gray-300"
      >
        {{ $t("message.invite.login") }}
      </div>
      <div
        class="w-3 h-3 bg-gray-100 dark:bg-gray-700 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { acceptInvite } from "@/api/factories/InviteFactory";
import { onMounted, ref } from "vue";
import { useCommunityStore } from "@/stores/CommunityStore";
import { useNotification } from "@kyvg/vue3-notification";
import { useUserStore } from "@/stores/UserStore";

const route = useRoute();
const router = useRouter();
const communityStore = useCommunityStore();
const notifications = useNotification();
const userStore = useUserStore();

const inviteID = ref<string>("");

const acceptInvitation = async () => {
  if (!inviteID.value || inviteID.value.length !== 21) {
    notifications.notify({ type: "error", text: "Oops, something went wrong" });
    return;
  }

  try {
    const response = await acceptInvite(inviteID.value);
    await communityStore.getCommunity(response);
    await communityStore.fetchMyCommunities();
    await communityStore.fetchNearbyCommunities();
    await router.push("/c");
  } catch (error) {
    notifications.notify({ type: "error", text: "Oops, something went wrong" });
  }
};

onMounted(() => {
  inviteID.value = route.params.inviteID;
});
</script>
