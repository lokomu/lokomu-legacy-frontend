<template>
  <div
    class="px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
  >
    <img
      v-if="conversation.recipient.image"
      class="h-10 w-10 rounded-full object-cover"
      :src="API_URL + 'image/' + conversation.recipient.image"
      alt="User image"
    >
    <PersonIcon
      v-else
      class="h-10 fill-green-500 mb-1"
    />
    <div class="w-full pb-2">
      <div class="flex justify-between">
        <span
          class="block ml-2 font-semibold text-base text-black dark:text-white"
        >{{ name }}</span>
        <span class="block ml-2 text-sm text-black dark:text-white">{{
          relativeTimeString
        }}</span>
      </div>
      <span class="block ml-2 text-sm text-black dark:text-white">{{
        conversation.lastMessage.content
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonIcon from "@/components/IconComponents/PersonIcon.vue";
import useRelativeTime from "@/composables/useRelativeTime";

const API_URL = import.meta.env.VITE_BASEURL;

const props = defineProps({
  conversation: {
    type: Object,
    required: true,
  },
});

const { relativeTimeString } = useRelativeTime(
  props.conversation.lastMessage.timestamp,
);

const name =
  props.conversation.recipient.firstName +
  " " +
  props.conversation.recipient.lastName;
</script>
