<template>
  <div class="bg-white rounded-lg shadow dark:bg-gray-700 p-4">
    <h3 class="text-xl text-center font-semibold dark:text-white mb-4">
      {{ title }}
    </h3>
    <p class="text-base text-center text-gray-500 dark:text-gray-400 mb-4">
      {{ message }}
    </p>
    <div class="flex justify-center">
      <ColorButton
        :text="actionText"
        button-color="red"
        @click="emit('action')"
      />
      <ColorButton
        id="cancel-button"
        class="ml-8"
        :text="$t('button.action_button')"
        button-color="blue"
        @click="emit('close')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorButton from "@/components/BaseComponents/ColorButton.vue";

defineProps<{
  title: string;
  message: string;
  actionText: string;
}>();

const emit = defineEmits<{
  close: [];
  action: [];
}>();
</script>
