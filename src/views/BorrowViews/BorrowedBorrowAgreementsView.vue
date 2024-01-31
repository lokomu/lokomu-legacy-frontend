<template>
  <div class="space-y-4 relative max-w-md">
    <IHeader />
    <div class="text-center dark:text-white text-xl m-2">
      {{ $t("title.borrows.borrowed") }}
    </div>
    <div class="space-y-5">
      <BorrowAgreementCard
        v-for="(borrowAgreement, i) in filteredAgreements"
        :key="i"
        :borrow-agreement="borrowAgreement"
        :owner="false"
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
  borrowStore.updateIncompleteAgreementsForBorrower();
});

const filteredAgreements = computed(() => {
  return borrowStore.incompleteAgreementsForBorrower.filter(
    (agreement) => agreement.status === 1,
  );
});
</script>
