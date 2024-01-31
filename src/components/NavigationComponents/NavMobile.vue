<template>
  <div>
    <FAB
      class="h-10 w-10 xs:h-12 xs:w-12 z-20 fixed left-1/2 -translate-y-1/2 -translate-x-1/2 bottom-0"
      @click="showModal()"
    />
    <MobileMenu
      v-if="showMenu"
      class="fixed right-0 xs:right-2 bottom-12 xs:bottom-14 z-20"
      @close-menu="showMenu = false"
    />

    <section
      class="flex justify-between h-10 xs:h-12 z-10 fixed inset-x-0 bottom-0 bg-transparent overflow-hidden"
    >
      <div
        class="w-full flex justify-between h-10 xs:h-12 z-20 rounded-tr-3xl bg-gradient-to-r from-pink-500 to-green-500 dark:from-pink-1000 dark:to-green-1000"
      >
        <div
          class="w-full cursor-pointer flex"
          @click="router.push('/')"
        >
          <LogoIcon class="m-auto w-9 fill-white" />
        </div>
        <div
          class="w-full cursor-pointer flex"
          @click="router.push('/b/requests')"
        >
          <BorrowIcon class="h-8 m-auto fill-white" />
        </div>
      </div>

      <div class="justify-between flex">
        <div
          class="h-24 w-20 xs:w-24 bg-green-500 dark:bg-green-1000 -rotate-45 translate-x-[1.5px] xs:-translate-x-[4.66px] rounded-tr-md"
        />
        <div class="w-full" />
        <div
          class="h-24 w-full bg-green-500 dark:bg-green-1000 rotate-45 translate-x-[-1.5px] xs:translate-x-[4.66px] rounded-tl-md"
        />
      </div>

      <div
        class="w-full flex justify-between h-10 xs:h-12 z-20 rounded-tl-3xl bg-gradient-to-r from-green-500 to-floyd-500 dark:from-green-1000 dark:to-floyd-1000"
      >
        <div
          class="flex w-full relative cursor-pointer"
          @click="loadMessages()"
        >
          <ChatIcon class="m-auto fill-white h-8" />
        </div>
        <div
          class="w-full flex cursor-pointer"
          @click="toggleMenu()"
        >
          <MenuIcon class="m-auto fill-white h-8" />
        </div>
      </div>
    </section>
    <Modal
      v-if="modalOn"
      @close-modal="hideModal()"
    >
      <ItemNew
        v-show="!communityOn"
        class="rounded-bl-none"
        @closes-modal="hideModal()"
        @open-new-community="changeModal(true)"
      />
      <CNew
        v-show="communityOn"
        class="rounded-br-none"
        @closes-modal="hideModal()"
      />
      <Switch
        :first-text="$t('button.item.new')"
        :second-text="$t('button.community.new')"
        first-text-style="text-white"
        second-text-style="text-white"
        first-class="bg-green-500 rounded-t-none"
        second-class="bg-floyd-500 rounded-t-none"
        :right-side-open="communityOn"
        @switch="changeModal"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Modal from "@/components/BaseComponents/Modal.vue";
import Switch from "@/components/BaseComponents/Switch.vue";
import ItemNew from "@/components/ItemComponents/ItemNew.vue";
import CNew from "@/components/CommunityComponents/CNew.vue";
import FAB from "@/components/BaseComponents/FAB.vue";

import ChatIcon from "@/components/IconComponents/ChatIcon.vue";
import MenuIcon from "@/components/IconComponents/MenuIcon.vue";
import LogoIcon from "@/components/IconComponents/LogoIcon.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useChatStore } from "@/stores/ChatStore";
import MobileMenu from "../BaseComponents/MobileMenu.vue";
import BorrowIcon from "../IconComponents/BorrowIcon.vue";

const router = useRouter();
const chatStore = useChatStore();

const modalOn = ref(false);
const communityOn = ref(false);
const showMenu = ref<boolean>(false);

function showModal() {
  modalOn.value = true;
}
function changeModal(value: boolean) {
  communityOn.value = value;
}
function hideModal() {
  modalOn.value = false;
  communityOn.value = false;
}
function toggleMenu() {
  showMenu.value = !showMenu.value;
}

async function loadMessages() {
  await chatStore.fetchMessages();
  await router.push("/messages");
}
</script>
