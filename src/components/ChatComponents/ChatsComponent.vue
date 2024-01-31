<template>
  <div class="flex w-full h-screen">
    <div
      :class="{ 'hidden md:block': chatStore.showChat }"
      class="h-screen absolute md:relative w-full md:max-w-[22rem] shadow md:rounded-bl-3xl dark:shadow-gray-800"
    >
      <div
        class="h-[3rem] bg-gray-50 dark:bg-gray-900 rounded-b-3xl shadow dark:shadow-gray-800"
      >
        <h1 class="p-2 text-center text-black dark:text-white text-lg">
          {{ $t("title.chat") }}
        </h1>
      </div>
      <ChatProfile
        v-for="(conversation, i) in chatStore.conversations"
        :key="i"
        :conversation="conversation"
        @click="selectUser(conversation)"
      />
      <div
        v-if="chatStore.conversations.length === 0"
        class="h-[calc(100vh-3rem)] flex flex-col justify-center"
      >
        <p class="text-center text-black dark:text-white">
          {{ $t("message.chat.conversation") }}
        </p>
      </div>
    </div>
    <ChatComponent
      v-if="chatStore.showChat"
      class="w-full"
    />
  </div>
</template>

<script setup lang="ts">
import ChatProfile from "@/components/ChatComponents/ChatProfile.vue";
import ChatComponent from "@/components/ChatComponents/ChatComponent.vue";
import { onMounted } from "vue";
import { useChatStore } from "@/stores/ChatStore";
import { Conversation } from "@/types/entities";

const chatStore = useChatStore();

const selectUser = async (conversation: Conversation) => {
  await chatStore.setRecipient(conversation.recipient);
  chatStore.setConversation(conversation.conversationID);
  chatStore.setByRequest(false);
  chatStore.showChat = true;
};

onMounted(() => {
  chatStore.fetchChats();
});
</script>
