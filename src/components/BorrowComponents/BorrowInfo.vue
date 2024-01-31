<template>
  <div class="bg-white dark:bg-gray-900 rounded-3xl w-full p-4">
    <div class="flex flex-col gap-4 w-full xs:w-3/4 mx-auto">
      <div
        v-if="item.image"
        class="overflow-hidden rounded-3xl"
      >
        <img
          :src="API_URL + 'image/' + item.image"
          alt="Item image"
          class="w-full h-full transform transition-transform duration-200 cursor-pointer"
          :class="{ 'scale-150': isZoomed }"
          @dblclick="toggleZoom"
        >
      </div>
      <div>
          <h1
            class="text-xl font-semibold tracking-tight text-dark dark:text-white sm:text-3xl"
          >
            {{ item.title }}
          </h1>
        </div>
        <div v-if="item.description">
          <p
            class="text-base tracking-tight text-gray-500 dark:text-gray-300 font-medium"
          >
            {{ item.description }}
          </p>
        </div>

    <div class="flex justify-center">
      <UserCard
        :user="item.user"
        :buttons="false"
        :requests="false"
        :admin="false"
      />
    </div>
<div v-if="!myItem" class="space-y-4">
    <div
    >
      <BorrowDatepicker
      class="mt-0"
        v-if="borrowDateReady"
        :non-available-dates="nonAvailableTimes"
        @chosen-date="setDate"
        @date-selected="isDateSelected"
      />
      <p
        v-if="error"
        class="text-red-500 text-sm ml-1 mb-5"
      >
        {{ $t("errors.borrow_period") }}
      </p>
    </div>

      <TextAreaField
          id="message"
          v-model="message"
          name="message"
          :placeholder="$t('message.message_borrow')"
          :rows="2"
        />
      <ColorButton class="mx-auto" @click="sendBorrow" button-color="green" :text="$t('button.borrow')" />
  </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { getBorrowAgreementTimesForItem } from "@/api/factories/BorrowAgreementFactory";
import { createBorrowRequest } from "@/api/factories/BorrowRequestFactory";
import UserCard from "@/components/UserProfileComponents/UserCard.vue";
import BorrowDatepicker from "@/components/BorrowComponents/BorrowDatepicker.vue";
import { onBeforeMount, ref } from "vue";
import { useCommunityStore } from "@/stores/CommunityStore";
import { useBorrowStore } from "@/stores/BorrowStore";
import { BorrowRequestCreation, Item, TimeframeDates } from "@/types/entities";
import TextAreaField from "@/components/BaseComponents/TextAreaField.vue";
import ColorButton from "../BaseComponents/ColorButton.vue";

const communityStore = useCommunityStore();
const borrowStore = useBorrowStore();

const props = defineProps<{
  item: Item;
  myItem: boolean;
}>();

const emits = defineEmits<{
  closesModal: [];
}>();

const API_URL = import.meta.env.VITE_BASEURL;

const error = ref<boolean>(false);
const chosenDates = ref<TimeframeDates>();
const allowForBorrow = ref<boolean>(false);
const nonAvailableTimes = ref<TimeframeDates[]>([]);
const message = ref<string>("");
const borrowDateReady = ref<boolean>(false);
const isZoomed = ref<boolean>(false);

function toggleZoom() {
  isZoomed.value = !isZoomed.value;
}

async function sendBorrow() {
  if (!allowForBorrow.value || !chosenDates.value) {
    error.value = true;
    return;
  }

  const borrow: BorrowRequestCreation = {
    itemID: props.item.itemID,
    communityID: communityStore.community.ID,
    message: message.value.trim(),
    startDate: chosenDates.value.startDate,
    endDate: chosenDates.value.endDate,
  };

  await createBorrowRequest(borrow);

  await borrowStore.fetchPendingRequestsForRequester();

  emits("closesModal");
}

async function setDate(timeframeDates: TimeframeDates) {
  if (!timeframeDates.startDate || !timeframeDates.endDate) {
    allowForBorrow.value = false;
    return;
  }
  chosenDates.value = timeframeDates;
  allowForBorrow.value = true;
  error.value = false;
}

function isDateSelected(value: boolean) {
  if (!value) allowForBorrow.value = false;
}

onBeforeMount(async () => {
  if (!props.myItem) {
    nonAvailableTimes.value = await getBorrowAgreementTimesForItem(
      props.item.itemID,
    );
    borrowDateReady.value = true;
  }
});
</script>
