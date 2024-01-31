<template>
  <div
    class="relative cursor-pointer overflow-hidden rounded-lg"
    :class="{ 'w-full px-2 py-6 bg-blue-700 dark:bg-blue-900': !image }"
  >
    <img
      v-if="image"
      class="w-full h-auto object-cover bg-white"
      :src="API_URL + 'image/' + image"
      alt="Item image"
      loading="lazy"
    >
    <div
      :class="{
        'absolute bottom-0 left-0 w-full p-2 bg-blue-950 bg-opacity-75': image,
      }"
    >
      <h2
        class="text-lg font-semibold text-center text-white overflow-hidden overflow-ellipsis"
      >
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
const API_URL = import.meta.env.VITE_BASEURL as string;

defineProps<{
  image: string;
  title: string;
}>();
</script>
