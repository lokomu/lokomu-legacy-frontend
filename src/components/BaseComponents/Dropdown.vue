<template>
  <div class="absolute z-10">
    <div
      class="bg-white dark:bg-gray-900 rounded-lg shadow w-44 my-4 text-base dark:text-gray-200"
    >
      <ul class="py-2 text-sm divide-y divide-gray-50 dark:divide-gray-800">
        <li
          v-for="item in props.menuItems"
          :key="item.id"
          class="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
          :class="item.class"
          @click="item.action"
        >
          {{ $t(item.text) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { MenuItem } from "@/types/entities";

const props = defineProps<{
  menuItems: {
    type: Array<MenuItem>;
    required: true;
  };
}>();

const emit = defineEmits<{ closeDropdown: [] }>();

function close(): void {
  emit("closeDropdown");
}

onMounted(() => {
  setTimeout(() => {
    document.addEventListener("click", close);
  }, 100);
});
onUnmounted(() => {
  document.removeEventListener("click", close);
});
</script>
