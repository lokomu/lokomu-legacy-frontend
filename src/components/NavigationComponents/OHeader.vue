<template>
  <div class="bg-transparent absolute top-0 left-0 w-full z-30 h-14">
    <nav class="flex justify-center">
      <router-link
        to="/"
        class="flex mt-2"
        aria-label="Home"
      >
        <DelIcon class="fill-white h-10 mr-2" />
        <LogoIcon class="fill-white h-9 mt-1" />
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import DelIcon from "@/components/IconComponents/DelIcon.vue";
import LogoIcon from "@/components/IconComponents/LogoIcon.vue";
</script>
