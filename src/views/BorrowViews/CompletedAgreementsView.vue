<template>
  <BorrowAgreementComponent
    :title="$t('title.borrows.completed')"
    :agreements-for-borrower="borrowStore.completedAgreementsForBorrower"
    :agreements-for-owner="borrowStore.completedAgreementsForOwner"
    @update-for-borrower="updateForBorrower()"
    @update-for-owner="updateForOwner()"
  />
</template>

<script setup lang="ts">
import { useBorrowStore } from "@/stores/BorrowStore";
import BorrowAgreementComponent from "@/components/BorrowComponents/BorrowAgreementComponent.vue";

const borrowStore = useBorrowStore();

async function updateForBorrower() {
  await borrowStore.updateCompletedAgreementsForBorrower();
}

async function updateForOwner() {
  await borrowStore.updateCompletedAgreementsForOwner();
}
</script>
