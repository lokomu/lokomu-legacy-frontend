<template>
  <div class="w-full flex">
    <div
      class="relative p-3 mb-3 w-auto"
      :class="[
        props.message.from === currentUserID
          ? 'bg-green-700 text-white rounded-l-lg ml-auto'
          : 'bg-gray-300 dark:bg-gray-900 text-black dark:text-white rounded-r-lg mr-auto',
      ]"
    >
      <span class="break-words">{{ message.content }}</span>
      <span class="text-xs mt-2 block text-right">{{ formatTime() }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFormatTime from "@/composables/useFormatTime";
import { Message } from "@/types/entities";

const props = defineProps<{
  message: Message;
  currentUserID: string;
}>();

const { formatTime } = useFormatTime(props.message.timestamp);
</script>
