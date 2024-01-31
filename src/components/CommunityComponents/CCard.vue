<template>
  <div>
    <div
      class="bg-white dark:bg-gray-900 w-28 rounded-t-[4rem] rounded-b-[2rem] shadow hover:shadow-lg dark:shadow-gray-800 overflow-hidden cursor-pointer"
      tabindex="0"
    >
      <div
        class="flex mt-2 w-[6rem] h-[6rem] rounded-full mx-auto overflow-hidden"
        :class="[
          {
            'border-4 border-green-500 dark:border-emerald-900':
              communityImage && open,
          },
          open
            ? 'bg-green-500 dark:bg-emerald-900'
            : 'bg-floyd-600 dark:bg-indigo-800',
        ]"
      >
        <img
          v-if="communityImage"
          :src="API_URL + 'image/' + communityImage"
          class="w-full h-full object-cover bg-white"
          alt="Community image"
        >
        <CommunityIcon
          v-else
          class="w-full m-auto h-14 fill-white"
        />
      </div>
      <div
        class="pb-2 text-center text-sm md:text-md font-semibold text-black dark:text-white px-1 overflow-hidden overflow-ellipsis flex-wrap mt-1"
      >
        {{ communityName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommunityIcon from "@/components/IconComponents/CommunityIcon.vue";
const API_URL = import.meta.env.VITE_BASEURL as string;
defineProps<{
  communityName: string;
  communityImage: string | null;
  open: boolean;
}>();
</script>
