<template>
  <div class="max-w-md mx-auto p-2 bg-blue-50 dark:bg-gray-900 rounded-3xl shadow-md">
    <div class="flex justify-evenly">
      <div class="text-center text-md font-semibold text-gray-700 dark:text-gray-100 mb-1">
        {{ formattedDates }}
      </div>
    </div>
    <div class="flex bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-2">
      <div class="w-1/3 flex flex-col my-auto overflow-hidden">
        <div
          v-if="borrowAgreement.item.image"
          class="h-20 w-20 mx-auto flex items-center justify-center"
        >
          <img
            :src="API_URL + 'image/' + borrowAgreement.item.image"
            alt="Borrow Image"
            class="object-cover rounded-2xl h-full w-full"
          >
        </div>
        <h2
          class="text-md text-center text-gray-800 dark:text-gray-100 font-semibold overflow-hidden overflow-ellipsis mt-2"
        >
          {{ borrowAgreement.item.title }}
        </h2>
      </div>

      <div class="w-2/3 flex flex-col justify-between space-y-4 ml-2">
        <div class="relative flex justify-center">
        <UserCard
        @click="openRating(borrowAgreement.borrower.userID)"
          :user="borrowAgreement.borrower"
          :requests="false"
          :admin="false"
          :buttons="false"
          class="cursor-pointer p-1  shadow-xl active:shadow-sm"
        />
        <UserRating class="absolute right-0" v-if="showRating && userRating" :rating="userRating" @close="closeRating"></UserRating>
      </div>
        <div
          v-if="owner"
          class="text-center dark:text-gray-100"
        >
          <div v-if="borrowAgreement.status === 0">
            <div>Waiting to be picked up...</div>
            <ColorButton
              class="mx-auto mt-4"
              text="Picked up"
              @click="setOngoingBorrow()"
            />
          </div>

          <div v-else-if="borrowAgreement.status === 1">
            <div>Borrowed out</div>
            <ColorButton
              class="mx-auto mt-4"
              text="Returned"
              @click="setReturnedBorrow()"
            />
          </div>
          <div v-else-if="borrowAgreement.status === 2">
            <div>Returned</div>
            <ColorButton
              class="mx-auto mt-4"
              text="Mark as completed"
              @click="openNewRating()"
            />
          </div>
          <div v-else>
            Completed
          </div>
        </div>
        <div
          v-else
          class="text-center dark:text-gray-100"
        >
          <div v-if="borrowAgreement.status === 0">
            Waiting to be picked up
          </div>
          <div v-else-if="borrowAgreement.status === 1">
            Borrowed
          </div>
          <div v-else-if="borrowAgreement.status === 2">
            Returned
          </div>
          <div v-else>
            Completed
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-if="showNewRatingModal"
      @close-modal="showNewRatingModal = false"
    >
      <Rating @send-rating="setCompletedBorrow"></Rating>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import UserCard from "@/components/UserProfileComponents/UserCard.vue";
import { BorrowAgreement, RatingStatus, Ratings, TimeframeDates } from "@/types/entities";
import { useFormattedDate } from "@/composables/useFormattedDate";
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import { ref } from "vue";
import { getRatingsForUser } from "@/api/factories/RatingFactory";
import UserRating from "@/components/RatingComponents/UserRating.vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import Rating from "@/components/RatingComponents/Rating.vue";

const API_URL: string = import.meta.env.VITE_BASEURL as string;

const userRating = ref<Ratings | null>(null);
const showRating = ref(false);
  const showNewRatingModal = ref(false);

const props = defineProps<{
  borrowAgreement: BorrowAgreement;
  owner: boolean;
}>();

const timeframeDates: TimeframeDates = {
  startDate: props.borrowAgreement.startDate,
  endDate: props.borrowAgreement.endDate,
};
const formattedDates = useFormattedDate(timeframeDates).formattedDate;

const emit = defineEmits<{
  setOngoing: [];
  setReturned: [];
  setCompleted: [newRating: RatingStatus];
}>();

function setOngoingBorrow(): void {
  emit("setOngoing");
}

function setReturnedBorrow(): void {
  emit("setReturned");
}

function setCompletedBorrow(rate: RatingStatus): void {
  emit("setCompleted", rate);
 closeNewRating();
}

function openNewRating() {
  showNewRatingModal.value = true;
}

function closeNewRating(){
  showNewRatingModal.value = false;
}

async function openRating(userID: string){
  if(userRating.value === null)userRating.value = await getRatingsForUser(userID);
  showRating.value = true;
}

function closeRating(){
  showRating.value = false;
}
</script>
