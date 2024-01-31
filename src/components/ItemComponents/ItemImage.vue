<template>
  <img
    :src="image"
    :class="{
      'w-24 h-24 object-cover rounded-full': profile,
    }"
    alt="Image"
  >
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  profile?: boolean;
}>();
</script>
