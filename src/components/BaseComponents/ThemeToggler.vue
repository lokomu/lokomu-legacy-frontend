<template>
  <div>
    <MoonIcon
      class="fill-floyd-800 h-7 cursor-pointer dark:hidden"
      @click="toggleTheme"
    />
    <SunIcon
      class="fill-yellow-300 h-7 cursor-pointer hidden dark:block"
      @click="toggleTheme"
    />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/ThemeStore";
import MoonIcon from "@/components/IconComponents/MoonIcon.vue";
import SunIcon from "@/components/IconComponents/SunIcon.vue";

const themeStore = useThemeStore();

function toggleTheme(): void {
  themeStore.toggleTheme();
}
</script>
