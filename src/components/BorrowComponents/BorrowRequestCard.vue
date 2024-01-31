<template>
  <div
    class="max-w-md mx-auto p-2 bg-blue-50 dark:bg-gray-900 rounded-3xl shadow-md"
  >
    <div class="flex justify-evenly">
      <div
        class="text-center text-md font-semibold text-gray-700 mb-1 dark:text-white"
      >
        {{ formattedDates }}
      </div>
    </div>
    <div
      class="flex bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-2"
    >
      <div class="w-1/3 flex flex-col my-auto overflow-hidden">
        <div
          v-if="borrowRequest.item.image"
          class="h-20 w-20 mx-auto flex items-center justify-center"
        >
          <img
            :src="API_URL + 'image/' + borrowRequest.item.image"
            alt="Borrow Image"
            class="object-cover rounded-2xl h-full w-full"
          >
        </div>
        <h2
          class="text-md text-center text-gray-800 dark:text-white font-semibold overflow-hidden overflow-ellipsis mt-2"
        >
          {{ borrowRequest.item.title }}
        </h2>
      </div>

      <div class="w-2/3 flex flex-col space-y-4 ml-2">
        <div class="relative flex justify-center">
        <UserCard
        @click="openRating(borrowRequest.requester.userID)"
          :user="borrowRequest.requester"
          :requests="false"
          :admin="false"
          :buttons="false"
          class="cursor-pointer mx-auto p-1 shadow-xl active:shadow-sm"
        />
        <UserRating class="absolute right-0" v-if="showRating && userRating" :rating="userRating" @close="closeRating"></UserRating>
      </div>
        <p
          v-if="borrowRequest.message"
          class="text-center text-gray-700 dark:text-white text-sm bg-blue-50 dark:bg-gray-900 p-2 rounded-xl shadow-lg"
        >
          {{ borrowRequest.message }}
        </p>

        <div
          v-if="borrowRequest.status === 0"
          class="mx-auto"
        >
          <div
            v-if="owner"
            class="flex flex-wrap"
          >
            <ColorButton
              text="Accept"
              button-color="green"
              class="mr-2"
              @click="acceptRequest()"
            >
              Accept
            </ColorButton>
            <ColorButton
              text="Decline"
              button-color="red"
              @click="declineRequest()"
            >
              Decline
            </ColorButton>
          </div>
          <div
            v-else
            class="text-center dark:text-white font-semibold"
          >
            Waiting for approval...
          </div>
        </div>
        <div
          v-else
          class="text-center"
        >
          <p
            v-if="borrowRequest.status === 1"
            class="text-green-500 font-semibold"
          >
            Accepted
          </p>
          <p
            v-else-if="borrowRequest.status === 2"
            class="text-red-500 font-semibold"
          >
            Declined
          </p>
          <p
            v-else-if="borrowRequest.status === 3"
            class="text-yellow-500 font-semibold"
          >
            Cancelled
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import UserCard from "@/components/UserProfileComponents/UserCard.vue";
import { BorrowRequest, Ratings, TimeframeDates } from "@/types/entities";
import { useFormattedDate } from "@/composables/useFormattedDate";
import { ref } from "vue";
import { getRatingsForUser } from "@/api/factories/RatingFactory";
import UserRating from "@/components/RatingComponents/UserRating.vue";

const API_URL: string = import.meta.env.VITE_BASEURL as string;

const props = defineProps<{ borrowRequest: BorrowRequest; owner: boolean }>();

const userRating = ref<Ratings | null>(null);
const showRating = ref(false);

const timeframeDates: TimeframeDates = {
  startDate: props.borrowRequest.startDate,
  endDate: props.borrowRequest.endDate,
};
const formattedDates = useFormattedDate(timeframeDates).formattedDate;

const emit = defineEmits<{
  accept: [];
  decline: [];
}>();

function acceptRequest(): void {
  emit("accept");
}

function declineRequest(): void {
  emit("decline");
}

async function openRating(userID: string){
  if(userRating.value === null)userRating.value = await getRatingsForUser(userID);
  showRating.value = true;
}

function closeRating(){
  showRating.value = false;
}
</script>
