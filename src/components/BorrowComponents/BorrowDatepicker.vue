<template>
    <Datepicker
      v-model="date"
      :placeholder="$t('placeholder.choose_period')"
      :ignore-time-validation="true"
      range
      no-disabled-range
      hide-offset-dates
      :enable-time-picker="false"
      locale="no"
      :cancel-text="$t('button.borrow_date.cancel')"
      :select-text="$t('button.borrow_date.choose')"
      :min-date="currentDate"
      :max-date="futureDate"
      :disabled-dates="disabledDates"
      menu-class-name="shadow-lg dark:shadow-gray-500"
      :format="'yyyy/M/d'"
      teleport-center
      :dark="themeStore.theme === 'dark'"
      class="mt-2"
      @update:model-value="handleDate"
      @cleared="datesCleared"
    />
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { onMounted, ref } from "vue";
import { useThemeStore } from "@/stores/ThemeStore";
import { TimeframeDates } from "@/types/entities";

const themeStore = useThemeStore();

const props = defineProps<{
  nonAvailableDates: TimeframeDates[];
}>();

const emit = defineEmits<{
  dateSelected: [value: boolean];
  chosenDate: [dates: TimeframeDates];
}>();

const date = ref<number[]>([]);
const disabledDates = ref<Date[]>([]);
const currentDate: Date = new Date();
const maxDays: number = 366;
const futureDate: Date = new Date(currentDate);
futureDate.setDate(currentDate.getDate() + maxDays);

function handleDate() {
  if (date.value[0] != null || date.value[1] != null) {
    emit("chosenDate", {
      startDate: date.value[0].toISOString().slice(0, 10),
      endDate: date.value[1].toISOString().slice(0, 10),
    });
  }
}

function datesCleared() {
  emit("dateSelected", false);
}

onMounted(() => {
  props.nonAvailableDates.forEach((timeframeDates: TimeframeDates) => {
    const startDate = new Date(timeframeDates.startDate);
    const endDate = new Date(timeframeDates.endDate);
    const daysDifference = (endDate.getTime() - startDate.getTime()) / 86400000;

    for (let k = 0; k <= daysDifference; k++) {
      const date = new Date(timeframeDates.startDate);
      date.setDate(startDate.getDate() + k);
      disabledDates.value.push(date);
    }
  });
});
</script>
