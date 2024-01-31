<template>
  <div>
    <InfinityLoader
      v-if="loading"
      class="mx-auto"
    />
    <div v-else>
      <div
        v-if="
          communityStore.myCommunities &&
            communityStore.myCommunities.length > 0
        "
      >
        <div
          v-if="showText"
          class="w-full text-center shadow rounded-b-3xl dark:shadow-gray-800"
        >
          <div class="p-3 mb-4 text-lg md:text-xl text-black dark:text-white">
            {{ $t("title.community.my") }}
          </div>
        </div>
        <CList
          :communities="communityStore.myCommunities"
          :member="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, ref } from "vue";
import CList from "@/components/CommunityComponents/CList.vue";
import InfinityLoader from "@/components/IconComponents/InfinityLoader.vue";
import { useCommunityStore } from "@/stores/CommunityStore";

const loading = ref<boolean>(false);
const communityStore = useCommunityStore();
defineProps({ showText: Boolean });

onActivated(async () => {
  loading.value = true;
  await communityStore.updateMyCommunities();
  loading.value = false;
});
</script>
