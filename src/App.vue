<template>
  <div>
    <Navigation />
    <div
      class="w-full min-h-screen bg-gradient-to-br from-floyd-100 via-[#E8EEF0] to-green-50 dark:bg-gradient-to-b dark:from-emerald-950 dark:to-black"
    >
      <div :class="{ 'md:ml-[4.5rem]': userStore.isLoggedIn }">
        <Notifications
          classes="vue-notification rounded-3xl border-0 mt-2 text-center md:ml-[4.5rem]"
          position="top center"
        />
        <router-view
          v-slot="{ Component, route }"
          class="max-w-5xl mx-auto"
        >
          <transition
            name="fade"
            enter-active-class="transition-opacity duration-700 ease-in"
            enter-from-class="opacity-0"
          >
            <keep-alive :max="100">
              <component
                :is="Component"
                :key="route.path"
              />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navigation from "@/components/NavigationComponents/Navigation.vue";
import { useUserStore } from "@/stores/UserStore";
import { provide, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useChatStore } from "@/stores/ChatStore";
import { useCommunityStore } from "@/stores/CommunityStore";
import { useBorrowStore } from "./stores/BorrowStore";

const userStore = useUserStore();
const router = useRouter();
const chatStore = useChatStore();
const communityStore = useCommunityStore();
const borrowStore = useBorrowStore();

const showMobileNavbar = ref(true);
provide("showMobileNavbar", showMobileNavbar);

watch(
  () => userStore.isLoggedIn,
  async (isLoggedIn) => {
    if (isLoggedIn) {
      await communityStore.updateMyCommunities();
      await communityStore.updateNearbyCommunities();
    } else {
      await chatStore.reset();
      await communityStore.reset();
      borrowStore.reset();
      await router.push("/");
    }
  },
);
</script>
