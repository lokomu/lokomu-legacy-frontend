<template>
  <div
    class="bg-floyd-500 p-2 xs:p-5 rounded-3xl shadow-md shadow-gray-600 flex flex-col items-center space-y-4"
  >
    <MyCommunitiesIcon
      class="icon hover:scale-105 transition-transform"
      @click="openMyCommunities"
    />
    <BackpackIcon
      class="icon hover:scale-105 transition-transform"
      @click="openMyItems"
    />
    <ProfileIcon
      class="icon hover:scale-105 transition-transform"
      @click="openMyProfile"
    />
    <!-- <SettingsIcon @click="openSettings" class="icon hover:scale-105 transition-transform" /> -->
  </div>
</template>

<script setup lang="ts">
import BackpackIcon from "@/components/IconComponents/BackpackIcon.vue";
import ProfileIcon from "@/components/IconComponents/ProfileIcon.vue";
import { onMounted, onUnmounted } from "vue";
//import SettingsIcon from '@/components/IconComponents/SettingsIcon.vue';
import MyCommunitiesIcon from "@/components/IconComponents/MyCommunitiesIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits<{ closeMenu: [] }>();

function close(): void {
  emit("closeMenu");
}

function openMyCommunities() {
  router.push("/u/communities");
}

function openMyItems() {
  router.push("/u/items");
}

function openMyProfile() {
  router.push("/u/profile");
}

//function openSettings(){ router.push('/c/my');}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener("click", close);
  }, 100);
});
onUnmounted(() => {
  document.removeEventListener("click", close);
});
</script>

<style scoped>
.icon {
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  fill: white;
}
</style>
