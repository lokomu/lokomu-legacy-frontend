<template>
  <input
    :id="id"
    class="w-full text-center text-sm p-2.5 outline-none rounded-lg"
    :class="validationClasses"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    @keyup.enter="onEnter"
  >
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type: string;
    id: string;
    placeholder: string;
    modelValue: string;
    isValid: boolean | null;
  }>(),
  {
    type: "text",
    isValid: null,
  },
);

const baseClasses =
  "bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 dark:focus:border-green-500";
const validClasses =
  "bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 dark:bg-gray-700 dark:border-green-500 focus:ring-green-500 focus:border-green-500";
const invalidClasses =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";

const validationClasses = computed(() => {
  return props.isValid === null
    ? baseClasses
    : props.isValid
    ? validClasses
    : invalidClasses;
});

const emit = defineEmits(["update:modelValue", "enter"]);

const onInput = (event: Event) => {
  if (event.target) {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
  }
};
const onEnter = () => emit("enter");
</script>
