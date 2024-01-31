<template>
  <div class="space-y-4 relative max-w-md">
    <IHeader />
    <div class="text-center dark:text-white text-xl m-2">
      {{ $t("title.borrows.loans") }}
    </div>
    <div class="space-y-5">
      <BorrowAgreementCard
        v-for="(borrowAgreement, i) in filteredAgreements"
        :key="i"
        :borrow-agreement="borrowAgreement"
        :owner="true"
        @set-returned="setReturnedBorrow(borrowAgreement.borrowID)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onActivated } from "vue";
import IHeader from "@/components/NavigationComponents/IHeader.vue";
import BorrowAgreementCard from "@/components/BorrowComponents/BorrowAgreementCard.vue";
import { useBorrowStore } from "@/stores/BorrowStore";

const borrowStore = useBorrowStore();

onActivated(async () => {
  borrowStore.updateIncompleteAgreementsForOwner();
});

async function setReturnedBorrow(agreementID: string) {
  await borrowStore.setReturnedAgreement(agreementID);
}

const filteredAgreements = computed(() => {
  return borrowStore.incompleteAgreementsForOwner.filter(
    (agreement) => agreement.status === 1,
  );
});
</script>
