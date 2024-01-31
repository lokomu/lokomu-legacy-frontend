<template>
  <BorrowRequestComponent
    :title="$t('title.borrows.declined')"
    :requests-for-requester="borrowStore.declinedRequestsForRequester"
    :requests-for-owner="borrowStore.declinedRequestsForOwner"
    @update-for-requester="updateForRequester()"
    @update-for-owner="updateForOwner()"
  />
</template>

<script setup lang="ts">
import { useBorrowStore } from "@/stores/BorrowStore";
import BorrowRequestComponent from "@/components/BorrowComponents/BorrowRequestComponent.vue";

const borrowStore = useBorrowStore();

async function updateForRequester() {
  await borrowStore.updateDeclinedRequestsForRequester();
}

async function updateForOwner() {
  await borrowStore.updateDeclinedRequestsForOwner();
}
</script>
