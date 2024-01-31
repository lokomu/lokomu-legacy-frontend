<template>
  <div class="py-2 flex justify-center">
    <router-link
      to="/"
      class="flex cursor-pointer"
    >
      <DelIcon class="fill-green-500 dark:fill-white h-10 mr-2" />
      <LogoIcon class="mt-1 h-9 fill-green-500 dark:fill-white" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import DelIcon from "@/components/IconComponents/DelIcon.vue";
import LogoIcon from "@/components/IconComponents/LogoIcon.vue";
</script>
