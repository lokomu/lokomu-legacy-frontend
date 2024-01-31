<template>
  <div>
    <CHeader :member="true" />
    <CMemberlist :buttons="true" :requests="false"/>
  </div>
</template>

<script setup lang="ts">
import CHeader from "@/components/CommunityComponents/CHeader.vue";
import CMemberlist from "@/components/CommunityComponents/CMemberlist.vue";
</script>
