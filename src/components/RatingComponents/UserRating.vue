<template>
    <div class="bg-white dark:bg-gray-900 dark:text-gray-100 shadow-lg rounded-3xl pl-4 p-2 text-center" @click.stop>
      <div class="flex items-center space-x-3 justify-center">
        <div class="flex items-center">
            <span>{{ rating.betterConditionAmount }}</span>
            <span class="ml-1 block w-4 h-4 bg-green-500 rounded-full"></span>
        </div>
        <div class="flex items-center">
            <span>{{ rating.sameConditionAmount }}</span>
            <span class="ml-1 block w-4 h-4 bg-floyd-500 rounded-full"></span>
        </div>
        <div class="flex items-center">
            <span>{{ rating.worseConditionAmount }}</span>
          <span class="ml-1 block w-4 h-4 bg-pink-700 rounded-full"></span>
        </div>
        <div class="flex items-center">
            <span>{{ rating.lateReturnAmount }}</span>
            <span class="ml-1 block w-4 h-4 bg-gray-500 rounded-full"></span>
        </div>
        <div class="flex items-center">
            <span>{{ rating.notReturnedAmount }}</span>
            <span class="ml-1 block w-4 h-4 bg-black rounded-full"></span>
        </div>
      <button @click="showLegend = !showLegend" class="h-8 w-8 text-xs border rounded-full flex items-center justify-center">
        i
      </button>
      </div>
      <div v-if="showLegend" class="flex justify-between items-start bg-gray-100 dark:bg-gray-800 rounded-3xl p-3.5 mt-2">
        <ul class="text-xs space-y-0.5">
          <li class="flex items-center"><span class="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>Better Condition</li>
          <li class="flex items-center"><span class="inline-block w-3 h-3 bg-floyd-500 rounded-full mr-2"></span>Same Condition</li>
          <li class="flex items-center"><span class="inline-block w-3 h-3 bg-pink-700 rounded-full mr-2"></span>Worse Condition</li>
          <li class="flex items-center"><span class="inline-block w-3 h-3 bg-gray-500 rounded-full mr-2"></span>Late Return</li>
          <li class="flex items-center"><span class="inline-block w-3 h-3 bg-black rounded-full mr-2"></span>Not Returned</li>
        </ul>
        <div class="ml-1 px-2 py-1 flex my-auto align-middle items-center rounded-3xl bg-white dark:bg-gray-900">
        <span>{{ rating.userAmount }}</span>
        <PersonIcon class="h-8 fill-floyd-500" />
      </div>
        </div>
    </div>
  </template>

<script setup lang="ts">
import { Ratings } from "@/types/entities";
import PersonIcon from "@/components/IconComponents/PersonIcon.vue"
import {ref, onMounted, onUnmounted} from "vue";

defineProps<{
  rating: Ratings
}>();

const emit = defineEmits<{ close: [] }>();

function close(){
  emit("close")
}

const showLegend = ref(false);

onMounted(() => {
  setTimeout(() => {
    document.addEventListener("click", close);
  }, 100);
});
onUnmounted(() => {
  document.removeEventListener("click", close);
});
</script>