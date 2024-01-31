<template>
  <div>
    <LandingPage v-if="!userStore.isLoggedIn" />
    <IHeader v-if="userStore.isLoggedIn" />
    <div
      v-if="userStore.isLoggedIn"
      class="min-h-[calc(100vh-3.5rem)] flex flex-col justify-center"
    >
      <MyCommunities />
      <CPublic />
    </div>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import CPublic from "@/components/CommunityComponents/CPublic.vue";
import MyCommunities from "@/components/CommunityComponents/MyCommunities.vue";
import { useUserStore } from "@/stores/UserStore";
import FooterBar from "@/components/NavigationComponents/FooterBar.vue";
import LandingPage from "@/components/BaseComponents/LandingPage.vue";
import IHeader from "@/components/NavigationComponents/IHeader.vue";

const userStore = useUserStore();
</script>
