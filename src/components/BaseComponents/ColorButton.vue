<template>
  <button
    type="button"
    class="flex bg-gradient-to-br hover:bg-gradient-to-tl items-center text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none text-center"
    :class="[color, focusRingColor]"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
type ButtonColor = "red" | "green" | "blue";

const props = withDefaults(
  defineProps<{
    text: string;
    buttonColor?: ButtonColor;
  }>(),
  {
    buttonColor: "blue",
  },
);

const colors = {
  red: "from-pink-500 via-pink-600 to-pink-700",
  green: "from-green-400 via-green-600 to-green-700",
  blue: "from-floyd-400 via-floyd-600 to-floyd-700",
};
const ringColors = {
  red: "focus:ring-pink-300 dark:focus:ring-pink-800",
  green: "focus:ring-green-300 dark:focus:ring-green-800",
  blue: "focus:ring-floyd-300 dark:focus:ring-floyd-800",
};

const color = colors[props.buttonColor];
const focusRingColor = ringColors[props.buttonColor];
</script>
