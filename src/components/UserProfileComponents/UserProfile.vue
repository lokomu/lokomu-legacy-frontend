<template>
  <div class="flex min-h-screen w-full items-center overflow-auto">
    <div class="flex flex-col max-w-md mx-auto pb-20">
      <div
        class="cursor-pointer flex flex-col justify-center overflow-visible dark:bg-slate-900 w-56 h-56 items-center rounded-full z-5 shadow-md dark:shadow-none"
        @click="showProfileEditModal = true"
      >
        <img
          v-if="userStore.currentUser.image"
          class="mb-3 w-24 h-24 rounded-full shadow-lg object-cover"
          :src="userStore.currentUser.image"
          alt="User image"
        >
        <ProfileIcon
          v-else
          class="h-24 fill-green-500"
        />
        <h5 class="mb-1 text-lg font-medium dark:text-white text-center">
          {{ userStore.currentUser.name }}
        </h5>
      </div>
      <div class="mx-auto mt-10 relative">
        <ShadowButton
          class="w-14 h-14 dark:bg-gray-800"
          @click="dropdown = !dropdown"
        >
          <MoreIcon class="m-auto h-12 fill-black dark:fill-white" />
        </ShadowButton>
        <Dropdown
          v-if="dropdown"
          class="left-1/2 -translate-x-1/2 pb-20 md:pb-0 z-10"
          :menu-items="menuItems"
          @close-dropdown="dropdown = false"
        />
      </div>
    </div>
    <Modal
      v-if="showProfileEditModal"
      @close-modal="showProfileEditModal = false"
    >
      <UserProfileEdit @closes-modal="showProfileEditModal = false" />
    </Modal>
    <Modal
      v-if="openChangePassword"
      @close-modal="openChangePassword = false"
    >
      <NewPassword @closes-modal="openChangePassword = false" />
    </Modal>
    <Modal
      v-if="showDeleteUserModal"
      @close-modal="showDeleteUserModal = false"
    >
      <ActionMessage
        :title="$t('message.delete_image_action.title')"
        :message="$t('message.delete_image_action.message')"
        :action-text="$t('message.delete_image_action.action')"
        @close="showDeleteUserModal = false"
        @action="deleteUser"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { deleteAccount } from "@/api/factories/UserFactory";
import UserProfileEdit from "@/components/UserProfileComponents/UserProfileEdit.vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import { useUserStore } from "@/stores/UserStore";
import MoreIcon from "@/components/IconComponents/MoreIcon.vue";
import ActionMessage from "@/components/BaseComponents/ActionMessage.vue";
import ProfileIcon from "@/components/IconComponents/ProfileIcon.vue";
import NewPassword from "@/components/UserAuthComponents/NewPassword.vue";
import { useRouter } from "vue-router";
import Dropdown from "@/components/BaseComponents/Dropdown.vue";
import ShadowButton from "@/components/BaseComponents/ShadowButton.vue";

const userStore = useUserStore();
const router = useRouter();

const dropdown = ref(false);
const showDeleteUserModal = ref(false);
const showProfileEditModal = ref(false);
const openChangePassword = ref(false);

const menuItems = [
  {
    id: 1,
    text: "menu.community.items",
    class: "text-black dark:text-white",
    action: () => router.push("/c/items"),
  },
  {
    id: 2,
    text: "menu.user.items",
    class: "text-black dark:text-white",
    action: () => router.push("/u/items"),
  },
  {
    id: 3,
    text: "menu.user.communities",
    class: "text-black dark:text-white",
    action: () => router.push("/u/communities"),
  },
  {
    id: 4,
    text: "menu.borrows.borrowed",
    class: "text-black dark:text-white",
    action: () => router.push("/b/borrowed"),
  },
  {
    id: 5,
    text: "menu.borrows.loans",
    class: "text-black dark:text-white",
    action: () => router.push("/b/loans"),
  },
  {
    id: 6,
    text: "menu.borrows.completed",
    class: "text-black dark:text-white",
    action: () => router.push("/b/completed"),
  },
  {
    id: 7,
    text: "menu.borrows.requests.canceled",
    class: "text-black dark:text-white",
    action: () => router.push("/b/requests/canceled"),
  },
  {
    id: 8,
    text: "menu.borrows.requests.declined",
    class: "text-black dark:text-white",
    action: () => router.push("/b/requests/declined"),
  },
  {
    id: 9,
    text: "menu.user.change",
    class: "text-black dark:text-white",
    action: () => (showProfileEditModal.value = true),
  },
  {
    id: 10,
    text: "menu.user.password",
    class: "text-black dark:text-white",
    action: () => (openChangePassword.value = true),
  },
  {
    id: 11,
    text: "menu.user.logout",
    class: "text-black dark:text-white",
    action: () => logOut(),
  },
  {
    id: 12,
    text: "menu.user.delete",
    class: "text-red-500 dark:text-red-700",
    action: () => (showDeleteUserModal.value = true),
  },
];

function logOut() {
  userStore.logout();
}
async function deleteUser() {
  await deleteAccount(userStore.currentUser.ID);
  logOut();
}
</script>
