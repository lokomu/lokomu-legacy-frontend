<template>
  <div class="space-y-4 relative max-w-md">
    <IHeader />
    <slot name="icons" />
    <div class="text-center dark:text-white text-xl m-2">
      {{ title }}
    </div>
    <Switch
      class="mx-auto max-w-md"
      :first-text="$t('button.borrows.owner')"
      :second-text="$t('button.borrows.requester')"
      first-text-style="text-black peer-checked/first:text-white"
      second-text-style="text-black peer-checked/second:text-white"
      first-class="bg-green-500"
      second-class="bg-floyd-500"
      :right-side-open="requesterOn"
      @switch="switchHandler()"
    />
    <div class="space-y-5">
      <BorrowRequestCard
        v-for="(borrowRequest, i) in currentRequests"
        :key="i"
        :borrow-request="borrowRequest"
        :owner="!requesterOn"
        @accept="acceptRequest(borrowRequest.borrowRequestID)"
        @decline="declineRequest(borrowRequest.borrowRequestID)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onActivated } from "vue";
import IHeader from "@/components/NavigationComponents/IHeader.vue";
import BorrowRequestCard from "@/components/BorrowComponents/BorrowRequestCard.vue";
import Switch from "@/components/BaseComponents/Switch.vue";
import { BorrowRequest } from "@/types/entities";

const props = defineProps<{
  title: string;
  requestsForRequester: BorrowRequest[];
  requestsForOwner: BorrowRequest[];
}>();

const emit = defineEmits<{
  updateForOwner: [];
  updateForRequester: [];
  accept: [borrowRequestID: string];
  decline: [borrowRequestID: string];
}>();

const requesterOn = ref<boolean>(false);

const currentRequests = computed(() =>
  requesterOn.value ? props.requestsForRequester : props.requestsForOwner,
);

function switchHandler() {
  requesterOn.value = !requesterOn.value;
  if (requesterOn.value) {
    emit("updateForRequester");
  } else {
    emit("updateForOwner");
  }
}

onActivated(async () => {
  emit("updateForOwner");
});

async function acceptRequest(borrowRequestID: string) {
  emit("accept", borrowRequestID);
}

async function declineRequest(borrowRequestID: string) {
  emit("decline", borrowRequestID);
}
</script>
