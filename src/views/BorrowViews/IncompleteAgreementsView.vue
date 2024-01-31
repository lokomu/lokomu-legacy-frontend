<template>
  <BorrowAgreementComponent
    :title="$t('title.borrows.agreements')"
    :agreements-for-borrower="borrowStore.incompleteAgreementsForBorrower"
    :agreements-for-owner="borrowStore.incompleteAgreementsForOwner"
    @update-for-borrower="updateForBorrower()"
    @update-for-owner="updateForOwner()"
    @set-ongoing="setOngoingBorrow"
    @set-returned="setReturnedBorrow"
    @set-completed="setCompletedBorrow"
  >
    <template #icons>
      <div
        class="absolute p-0.5 flex cursor-pointer shadow-md rounded-xl"
        @click="router.push('/b/requests')"
      >
        <NextIcon class="h-6 rotate-180" />
        <WavingHandIcon class="h-7" />
      </div>
    </template>
  </BorrowAgreementComponent>
</template>

<script setup lang="ts">
import { useBorrowStore } from "@/stores/BorrowStore";
import BorrowAgreementComponent from "@/components/BorrowComponents/BorrowAgreementComponent.vue";
import { useRouter } from "vue-router";
import NextIcon from "@/components/IconComponents/NextIcon.vue";
import WavingHandIcon from "@/components/IconComponents/WavingHandIcon.vue";
import { RatingStatus } from "@/types/entities";

const router = useRouter();
const borrowStore = useBorrowStore();

async function updateForBorrower() {
  await borrowStore.updateIncompleteAgreementsForBorrower();
}

async function updateForOwner() {
  await borrowStore.updateIncompleteAgreementsForOwner();
}

async function setOngoingBorrow(borrowID: string) {
  await borrowStore.setOngoingAgreement(borrowID);
}

async function setReturnedBorrow(borrowID: string) {
  await borrowStore.setReturnedAgreement(borrowID);
}

async function setCompletedBorrow(borrowID: string, rate: RatingStatus) {
  await borrowStore.setCompletedAgreement(borrowID, rate);
}
</script>
