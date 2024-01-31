<template>
    <div class="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl max-w-xs mx-auto">
    <div class="text-center text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Rate the Condition</div>
      <div class="space-y-3">
        <label class="flex items-center justify-between px-5 py-3 bg-green-100 dark:bg-green-950 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-900">
          <span class="text-green-800 dark:text-green-50 font-medium">Better Condition</span>
          <input type="radio" name="condition" value="0" v-model="selectedCondition" class="h-6 w-6">
        </label>
        <label class="flex items-center justify-between px-5 py-3 bg-floyd-100 dark:bg-floyd-1000 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-floyd-900">
          <span class="text-floyd-800 dark:text-floyd-50 font-medium">Same Condition</span>
          <input type="radio" name="condition" value="1" v-model="selectedCondition" class="h-6 w-6">
        </label>
        <label class="flex items-center justify-between px-5 py-3 bg-pink-100 dark:bg-pink-1000 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-pink-950">
          <span class="text-pink-800 dark:text-pink-50 font-medium">Worse Condition</span>
          <input type="radio" name="condition" value="2" v-model="selectedCondition" class="h-6 w-6">
        </label>
        <label class="flex items-center justify-between px-5 py-3 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700">
          <span class="text-gray-800 dark:text-gray-50 font-medium">Late Return</span>
          <input type="radio" name="condition" value="3" v-model="selectedCondition" class="h-6 w-6">
        </label>
        <label class="flex items-center justify-between px-5 py-3 bg-black rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-950">
          <span class="text-white font-medium">Not Returned</span>
          <input type="radio" name="condition" value="4" v-model="selectedCondition" class="h-6 w-6">
        </label>
      </div>
      <ColorButton class="mt-6 mx-auto" @click="sendRating" text="Send rating" ></ColorButton>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import ColorButton from "@/components/BaseComponents/ColorButton.vue"
  import { RatingStatus } from "@/types/entites"
  
  const selectedCondition = ref<RatingStatus | null>(null);

  const emit = defineEmits<{ 
    sendRating: [rate: RatingStatus];
  }>();

  function sendRating(){
    if(selectedCondition.value !== null) {
      emit("sendRating", selectedCondition.value);
    }
  }
  </script>