<template>
  <div class="flex relative w-full h-full">
    <div
      class="absolute transition-transform duration-1000 ease-in-out rounded-3xl h-full w-1/2"
      :class="
        changed
          ? 'translate-x-full ' + secondClass
          : 'translate-x-0 ' + firstClass
      "
    />
    <input
      id="first"
      type="radio"
      name="option"
      class="peer hidden peer/first"
      :checked="!changed"
    >
    <label
      for="first"
      class="cursor-pointer p-2 text-center z-30 w-1/2 left-0 rounded-full font-bold peer-checked:font-normal"
      :class="firstTextStyle"
      @click="change(false)"
    >{{ firstText }}</label>
    <input
      id="second"
      type="radio"
      name="option"
      class="peer hidden peer/second"
      :checked="changed"
    >
    <label
      for="second"
      class="cursor-pointer p-2 text-center z-30 w-1/2 right-0 rounded-full peer-checked/first:font-bold"
      :class="secondTextStyle"
      @click="change(true)"
    >{{ secondText }}</label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  firstText: string;
  secondText: string;
  firstTextStyle: string;
  secondTextStyle: string;
  firstClass: string;
  secondClass: string;
  rightSideOpen: boolean;
}>();

const changed = ref<boolean>(false);

watch(
  () => props.rightSideOpen,
  (newVal) => {
    changed.value = newVal;
  },
);

const emit = defineEmits<{
  switch: [activate: boolean];
}>();

function change(newValue: boolean): void {
  if (changed.value === newValue) return;
  changed.value = newValue;
  emit("switch", newValue);
}
</script>
