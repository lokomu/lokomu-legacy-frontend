<template>
  <div>
    <InfinityLoader
      v-if="loading"
      class="mx-auto"
    />
    <p
      v-if="
        (!communityStore.nearbyCommunities ||
          !communityStore.nearbyCommunities.length) &&
          (!communityStore.myCommunities || !communityStore.myCommunities.length)
      "
      class="text-center font-normal text-gray-900 dark:text-white"
    >
      {{ $t("message.community.none_part_1") }}<br>{{
        $t("message.community.none_part_2")
      }}
    </p>
    <div
      v-else-if="
        communityStore.nearbyCommunities &&
          communityStore.nearbyCommunities.length > 0
      "
    >
      <div class="text-center w-full">
        <router-link
          to="/c/find"
          class="p-1 mb-2 text-lg md:text-xl inline-block cursor-pointer text-black dark:text-white hover:text-gray-700 active:text-gray-200 dark:hover:text-gray-100 dark:active:text-gray-700"
        >
          <div>
            {{ $t("title.community.near") }}
          </div>
        </router-link>
      </div>
      <CList
        :communities="communityStore.nearbyCommunities"
        :member="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, ref } from "vue";
import CList from "@/components/CommunityComponents/CList.vue";
import InfinityLoader from "@/components/IconComponents/InfinityLoader.vue";
import { useCommunityStore } from "@/stores/CommunityStore";

const loading = ref(false);
const communityStore = useCommunityStore();

onActivated(async () => {
  loading.value = true;
  await communityStore.updateNearbyCommunities();
  loading.value = false;
});
</script>
