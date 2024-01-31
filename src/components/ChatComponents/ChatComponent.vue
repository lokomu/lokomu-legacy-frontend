<template>
  <div class="flex flex-col h-screen">
    <div
      class="h-[3rem] bg-gray-50 dark:bg-gray-900 flex justify-between md:justify-center sticky rounded-b-3xl shadow dark:shadow-gray-800"
    >
      <div
        class="md:hidden ml-4 grid mt-1 space-y-2 content-center cursor-pointer"
        @click="closeChat()"
      >
        <ArrowBackIcon class="h-10 fill-black dark:fill-white" />
      </div>
      <div class="flex py-2">
        <img
          v-if="chatStore.recipient.image"
          class="h-9 my-auto object-cover rounded-full"
          :src="chatStore.recipient.image"
          :alt="$t('alt.user_image')"
        >
        <PersonIcon
          v-else
          class="h-9 fill-green-500"
        />
        <h1
          class="text-black dark:text-white ml-2 my-auto text-md font-semibold"
        >
          {{ chatStore.recipient.name }}
        </h1>
      </div>
      <div
        class="md:hidden mr-4 flex cursor-pointer"
        @click="router.push('/')"
      >
        <LogoIcon class="my-auto h-6 fill-green-500 dark:fill-white" />
      </div>
    </div>
    <div
      id="conversation"
      class="h-screen w-full p-2 overflow-y-scroll min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-7rem)]"
      :style="conversationStyle"
    >
      <div
        v-if="chatStore.showLoadMore"
        class="mx-auto bg-white dark:bg-gray-900 rounded-full w-10 h-10 m-2 cursor-pointer"
        @click="loadMoreMessages"
      >
        <ArrowBackIcon class="rotate-90 fill-black dark:fill-white" />
      </div>
      <div
        v-for="(msg, i) in chatStore.sortedMessages"
        :key="i"
      >
        <ChatMessage
          :message="msg"
          :current-user-i-d="currentUserID"
        />
      </div>
    </div>
    <div
      class="flex bg-gray-50 dark:bg-gray-900 items-center justify-between w-full h-[7rem] px-2 rounded-t-3xl shadow dark:shadow-gray-500"
    >
      <input
        v-model="message"
        type="text"
        :placeholder="$t('placeholder.chat')"
        class="text-black dark:text-white w-full py-2 pl-4 ml-2 bg-gray-100 dark:bg-gray-800 rounded-full outline-none"
        name="message"
        autocomplete="off"
        @keyup.enter="sendMessage"
      >
      <SendIcon
        class="h-8 px-4 cursor-pointer fill-black dark:fill-white"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script setup>
import ChatMessage from "@/components/ChatComponents/ChatMessage";
import ArrowBackIcon from "@/components/IconComponents/ArrowBackIcon";
import SendIcon from "@/components/IconComponents/SendIcon";
import LogoIcon from "@/components/IconComponents/LogoIcon";
import { useScreenSizeStore } from "@/stores/ScreenSizeStore";
import PersonIcon from "@/components/IconComponents/PersonIcon";
import {
  nextTick,
  watch,
  ref,
  computed,
  inject,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
} from "vue";
import { useRouter } from "vue-router";
import { useChatStore } from "@/stores/ChatStore";
import { useUserStore } from "@/stores/UserStore";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";

const screenSizeStore = useScreenSizeStore();
const chatStore = useChatStore();
const router = useRouter();
const userStore = useUserStore();
const notification = useNotification();
const { t } = useI18n();

const currentUserID = ref(userStore.currentUser.ID);
const message = ref("");
const showMobileNavbar = inject("showMobileNavbar");

const conversationStyle = computed(() => ({
  height: `calc(100vh - ${screenSizeStore.bottomNavigationHeight}px)`,
}));

async function sendMessage() {
  message.value = message.value.trim();
  if (!message.value) return;
  try {
    await chatStore.sendMessage(message.value);
    message.value = "";
  } catch {
    notification.notify({
      text: t("notification.error"),
      type: "error",
    });
  }
}

async function loadMoreMessages() {
  await chatStore.debouncedLoadMoreMessages();

  await nextTick(() => {
    setTimeout(() => {
      scrollTop();
    }, 1000);
  });
}

async function closeChat() {
  await chatStore.fetchChats();
  chatStore.setByRequest(false);
  chatStore.showChat = false;
}

function scrollDown() {
  const container = document.querySelector("#conversation");
  container.scrollTop = container.scrollHeight;
}

function scrollTop() {
  const container = document.querySelector("#conversation");
  container.scrollTop = 0;
}

watch(
  () => chatStore.messages,
  () => {
    nextTick(() => {
      setTimeout(() => {
        scrollDown();
      }, 100);
    });
  },
);

onMounted(() => {
  showMobileNavbar.value = false;
  chatStore.fetchMessages();
  setTimeout(() => {
    scrollDown();
  }, 100);
});
onUnmounted(() => {
  showMobileNavbar.value = true;
});
onActivated(() => {
  showMobileNavbar.value = false;
  setTimeout(() => {
    scrollDown();
  }, 100);
});
onDeactivated(() => {
  showMobileNavbar.value = true;
});
</script>
