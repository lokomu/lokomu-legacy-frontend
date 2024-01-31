<template>
  <div class="relative">
    <MyLocationIcon
      class="absolute left-2 top-5 cursor-pointer transform -translate-y-1/2 h-6 w-6 fill-gray-700 dark:fill-white"
      @click="onSearched"
    />
    <InputField
      id="address"
      v-model="searchInput"
      class="px-8"
      type="text"
      name="address"
      :placeholder="$t('placeholder.address')"
      :is-valid="valid"
      @input="onSearched"
    />
    <ul
      v-if="suggestions.length"
      class="absolute w-full z-10 mt-1 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
    >
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="w-full px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.display_name }}
      </li>
    </ul>
    <div
      class="relative left-0 w-full pt-1 text-center text-[10px] text-gray-500 dark:text-gray-400"
    >
      Search by OpenStreetMap
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import axios from "axios";
import MyLocationIcon from "@/components/IconComponents/MyLocationIcon.vue";
import { useDebounce } from "@/composables/useDebounce";
import InputField from "@/components/BaseComponents/InputField.vue";
import { useNotification } from "@kyvg/vue3-notification";

const notification = useNotification();

const props = defineProps({ isValid: { type: Boolean, default: null } });
const emit = defineEmits(["location-selected"]);

const searchInput = ref("");
const suggestions = ref<Suggestion[]>([]);

const valid = computed(() => {
  return props.isValid;
});

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
  addresstype: string;
}

const searchLocation = async () => {
  if (!searchInput.value.trim()) {
    suggestions.value = [];
    return;
  }

  const apiUrl = "http://nominatim.openstreetmap.org/search";
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: searchInput.value,
        format: "json",
        limit: 5,
      },
    });
    suggestions.value = response.data;
  } catch (error) {
    notification.notify({
      type: "warn",
      text: "Error retrieving the location",
    });
    suggestions.value = [];
  }
};

const onSearched = useDebounce(searchLocation, 350);

const selectSuggestion = (suggestion: Suggestion) => {
  searchInput.value = suggestion.display_name;
  suggestions.value = [];
  emit("location-selected", {
    lat: parseFloat(suggestion.lat),
    lon: parseFloat(suggestion.lon),
    address: suggestion.display_name,
  });
};
</script>
