<template>
  <div>
    <OHeader v-if="!userStore.isLoggedIn" />
    <NavDesktop v-if="userStore.isLoggedIn && screenSizeStore.isLargeScreen" />
    <NavbarMobile
      v-if="
        userStore.isLoggedIn &&
          !screenSizeStore.isLargeScreen &&
          showMobileNavbar
      "
    />
  </div>
</template>

<script setup lang="ts">
import NavbarMobile from "@/components/NavigationComponents/NavMobile.vue";
import NavDesktop from "@/components/NavigationComponents/NavDesktop.vue";
import OHeader from "@/components/NavigationComponents/OHeader.vue";
import { useUserStore } from "@/stores/UserStore";
import { useScreenSizeStore } from "@/stores/ScreenSizeStore";
import { inject } from "vue";

const userStore = useUserStore();
const screenSizeStore = useScreenSizeStore();

const showMobileNavbar = inject("showMobileNavbar");
</script>
