<template>
  <div
    class="absolute right-9 w-36 top-0 z-10 border border-blue-400 rounded-xl bg-white dark:bg-gray-900"
  >
    <ul>
      <li id="invite">
        <div
          class="block cursor-pointer py-2 px-4 text-sm text-black dark:text-white"
          @click="openInviteModal()"
        >
          {{ $t("menu.community.invite") }}
        </div>
      </li>
      <li
        v-if="admin"
        id="adminCommunity"
      >
        <router-link
          to="/c/admin"
          class="block py-2 px-4 text-sm text-black dark:text-white"
        >
          {{ $t("menu.community.admin") }}
        </router-link>
      </li>
      <li
        v-else
        id="getMembers"
      >
        <router-link
          to="/c/members"
          class="block py-2 px-4 text-sm text-black dark:text-white"
        >
          {{ $t("menu.community.members") }}
        </router-link>
      </li>
      <li
        v-if="!admin"
        id="leaveCommunity"
      >
        <div
          class="cursor-pointer block py-2 px-4 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          @click="openLeaveCommunity"
        >
          {{ $t("menu.community.leave") }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { onMounted, onUnmounted } from "vue";
import { useCommunityStore } from "@/stores/CommunityStore";

const emit = defineEmits<{
  openLeaveCommunityDialog: [];
  closeDropdown: [];
  openInviteModal: [];
}>();

function openLeaveCommunity(): void {
  emit("openLeaveCommunityDialog");
}

function close(): void {
  emit("closeDropdown");
}

function openInviteModal(): void {
  emit("openInviteModal");
}

const communityStore = useCommunityStore();
const userStore = useUserStore();

let admin: boolean = false;
if (Array.isArray(userStore.adminList))
  admin = userStore.adminList.includes(communityStore.community.ID);

onUnmounted(() => {
  document.removeEventListener("click", close);
});

onMounted(() => {
  setTimeout(() => {
    document.addEventListener("click", close);
  }, 100);
});
</script>
