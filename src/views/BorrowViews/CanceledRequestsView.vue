<template>
  <BorrowRequestComponent
    :title="$t('title.borrows.canceled')"
    :requests-for-requester="borrowStore.canceledRequestsForRequester"
    :requests-for-owner="borrowStore.canceledRequestsForOwner"
    @update-for-requester="updateForRequester()"
    @update-for-owner="updateForOwner()"
  />
</template>

<script setup lang="ts">
import { useBorrowStore } from "@/stores/BorrowStore";
import BorrowRequestComponent from "@/components/BorrowComponents/BorrowRequestComponent.vue";

const borrowStore = useBorrowStore();

async function updateForRequester() {
  await borrowStore.updateCanceledRequestsForRequester();
}

async function updateForOwner() {
  await borrowStore.updateCanceledRequestsForOwner();
}
</script>
