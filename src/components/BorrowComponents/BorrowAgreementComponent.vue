<template>
  <div class="space-y-4 relative max-w-md">
    <IHeader />
    <slot name="icons" />
    <div class="text-center dark:text-white text-xl m-2">
      {{ title }}
    </div>
    <Switch
      class="mx-auto"
      :first-text="$t('button.borrows.owner')"
      :second-text="$t('button.borrows.borrower')"
      first-text-style="text-black peer-checked/first:text-white"
      second-text-style="text-black peer-checked/second:text-white"
      first-class="bg-green-500"
      second-class="bg-floyd-500"
      :right-side-open="borrowerOn"
      @switch="switchHandler()"
    />
    <div class="space-y-5">
      <BorrowAgreementCard
        v-for="(borrowAgreement, i) in currentAgreements"
        :key="i"
        :borrow-agreement="borrowAgreement"
        :owner="!borrowerOn"
        @set-ongoing="setOngoingBorrow(borrowAgreement.borrowID)"
        @set-returned="setReturnedBorrow(borrowAgreement.borrowID)"
        @set-completed="(rate) => setCompletedBorrow(borrowAgreement.borrowID, rate)"
    
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onActivated } from "vue";
import IHeader from "@/components/NavigationComponents/IHeader.vue";
import Switch from "@/components/BaseComponents/Switch.vue";
import { BorrowAgreement, RatingStatus } from "@/types/entities";
import BorrowAgreementCard from "@/components/BorrowComponents/BorrowAgreementCard.vue";

const props = defineProps<{
  title: string;
  agreementsForBorrower: BorrowAgreement[];
  agreementsForOwner: BorrowAgreement[];
}>();

const emit = defineEmits<{
  updateForOwner: [];
  updateForBorrower: [];
  setOngoing: [agreementID: string];
  setReturned: [agreementID: string];
  setCompleted: [agreementID: string, rate: RatingStatus];
}>();

const borrowerOn = ref<boolean>(false);

const currentAgreements = computed(() =>
  borrowerOn.value ? props.agreementsForBorrower : props.agreementsForOwner,
);

function switchHandler() {
  borrowerOn.value = !borrowerOn.value;
  if (borrowerOn.value) {
    emit("updateForBorrower");
  } else {
    emit("updateForOwner");
  }
}

onActivated(async () => {
  emit("updateForOwner");
});

async function setOngoingBorrow(agreementID: string) {
  emit("setOngoing", agreementID);
}

async function setReturnedBorrow(agreementID: string) {
  emit("setReturned", agreementID);
}

async function setCompletedBorrow(agreementID: string, rate: RatingStatus) {
  emit("setCompleted", agreementID, rate);
}
</script>
