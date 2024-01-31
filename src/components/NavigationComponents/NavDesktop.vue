<template>
  <div>
    <div
      class="flex flex-col justify-between fixed h-screen w-[4.5rem] bg-white dark:bg-gray-900 border-1 dark:border-0 border-r border-gray-300 left-0 z-30 rounded-r-2xl"
    >
      <div
        id="top-navrail"
        class="flex mt-6"
      >
        <ShadowButton
          aria-label="Home"
          class="mx-auto w-16 h-16 dark:bg-transparent"
          @click="router.push('/')"
        >
          <LogoIcon class="m-auto fill-green-500 dark:fill-white w-12" />
        </ShadowButton>
      </div>
      <div class="flex flex-col space-y-8">
        <FAB
          class="mx-auto mb-2 h-10 w-10 fill-gray-600 dark:fill-white"
          @click="showModal()"
        />
        <ShadowButton
          aria-label="Chat"
          class="mx-auto w-12 h-12 relative"
          @click="loadMessages"
        >
          <ChatIcon class="m-auto h-8 fill-gray-600 dark:fill-white" />
        </ShadowButton>
        <ShadowButton
          class="mx-auto w-12 h-12 relative"
          aria-label="Sharing"
          @click="router.push('/b/requests')"
        >
          <ExchangeIcon class="m-auto h-8 fill-gray-600 dark:fill-white" />
        </ShadowButton>
      </div>
      <ShadowButton
        aria-label="More"
        class="mx-auto w-12 h-12 mb-6"
        @click="toggleDropdown()"
      >
        <MoreIcon class="m-auto h-10 fill-gray-600 dark:fill-white" />
      </ShadowButton>
      <Dropdown
        v-if="showDropdown"
        class="bottom-0 left-[4.75rem]"
        :menu-items="menuItems"
        @close-dropdown="hideDropdown()"
      />
    </div>
    <Modal
      v-if="modalOn"
      @close-modal="hideModal()"
    >
      <div>
        <ItemNew
          v-show="!CModal"
          class="rounded-bl-none"
          @closes-modal="hideModal"
          @open-new-community="changeModal(true)"
        />
        <CNew
          v-show="CModal"
          class="rounded-br-none"
          @closes-modal="hideModal"
        />
        <Switch
          :first-text="$t('button.item.new')"
          :second-text="$t('button.community.new')"
          first-text-style="text-white"
          second-text-style="text-white"
          first-class="bg-green-500 rounded-t-none"
          second-class="bg-floyd-500 rounded-t-none"
          :right-side-open="CModal"
          @switch="changeModal"
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import Switch from "@/components/BaseComponents/Switch.vue";
import ItemNew from "@/components/ItemComponents/ItemNew.vue";
import CNew from "@/components/CommunityComponents/CNew.vue";
import ChatIcon from "@/components/IconComponents/ChatIcon.vue";
import FAB from "@/components/BaseComponents/FAB.vue";
import LogoIcon from "@/components/IconComponents/LogoIcon.vue";
import { useRouter } from "vue-router";
import Dropdown from "@/components/BaseComponents/Dropdown.vue";
import { useUserStore } from "@/stores/UserStore";
import ShadowButton from "@/components/BaseComponents/ShadowButton.vue";
import MoreIcon from "@/components/IconComponents/MoreIcon.vue";
import { useChatStore } from "@/stores/ChatStore";
import ExchangeIcon from "@/components/IconComponents/ExchangeIcon.vue";

const router = useRouter();
const userStore = useUserStore();
const chatStore = useChatStore();

const CModal = ref(false);
const modalOn = ref(false);
const showDropdown = ref(false);

const menuItems = [
  {
    id: 1,
    text: "menu.community.items",
    class: "text-black dark:text-white",
    action: () => router.push("/c/items"),
  },
  {
    id: 2,
    text: "menu.user.communities",
    class: "text-black dark:text-white",
    action: () => router.push("/u/communities"),
  },
  {
    id: 3,
    text: "menu.user.items",
    class: "text-black dark:text-white",
    action: () => router.push("/u/items"),
  },
  {
    id: 4,
    text: "menu.user.profile",
    class: "text-black dark:text-white",
    action: () => router.push("/u/profile"),
  },
  {
    id: 5,
    text: "menu.user.logout",
    class: "text-red-500 dark:text-red-500",
    action: () => userStore.logout(),
  },
];
async function loadMessages() {
  await chatStore.fetchMessages();
  await router.push("/messages");
}
function showModal() {
  modalOn.value = true;
}
function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}
function changeModal(value: boolean) {
  CModal.value = value;
}
function hideDropdown() {
  showDropdown.value = false;
}
function hideModal() {
  modalOn.value = false;
  CModal.value = false;
}
</script>
