<template>
  <BorrowRequestComponent
    :title="$t('title.borrows.requests')"
    :requests-for-requester="borrowStore.pendingRequestsForRequester"
    :requests-for-owner="borrowStore.pendingRequestsForOwner"
    @update-for-requester="updateForRequester()"
    @update-for-owner="updateForOwner()"
    @accept="acceptRequest"
    @decline="declineRequest"
  >
    <template #icons>
      <div
        class="absolute right-0 p-0.5 flex cursor-pointer shadow-md rounded-xl"
        @click="router.push('/b/agreements')"
      >
        <HandshakeIcon class="h-7" />
        <NextIcon class="h-6" />
      </div>
    </template>
  </BorrowRequestComponent>
</template>

<script setup lang="ts">
import NextIcon from "@/components/IconComponents/NextIcon.vue";
import HandshakeIcon from "@/components/IconComponents/HandshakeIcon.vue";
import { useRouter } from "vue-router";
import { BorrowStore, useBorrowStore } from "@/stores/BorrowStore";
import BorrowRequestComponent from "@/components/BorrowComponents/BorrowRequestComponent.vue";

const router = useRouter();
const borrowStore: BorrowStore = useBorrowStore();

async function updateForRequester() {
  await borrowStore.updatePendingRequestsForRequester();
}

async function updateForOwner() {
  await borrowStore.updatePendingRequestsForOwner();
}

async function acceptRequest(borrowRequestID: string) {
  await borrowStore.acceptBorrowRequest(borrowRequestID);
}

async function declineRequest(borrowRequestID: string) {
  await borrowStore.declineBorrowRequest(borrowRequestID);
}
</script>
