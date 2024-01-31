<template>
  <div>
    <ColorButton
      text="ASD"
      button-color="green"
    />
    <UserRating :rating="rating"/>
    <Rating ></Rating>
  </div>
</template>

<script setup lang="ts">
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import UserRating from "@/components/RatingComponents/UserRating.vue"
import Rating from "@/components/RatingComponents/Rating.vue"
import { Ratings } from "@/types/entities";
import { ref } from "vue";

const rating = ref<Ratings>({
  userAmount: 34,
  sameConditionAmount: 12,
  betterConditionAmount: 3,
  worseConditionAmount: 7,
  lateReturnAmount: 1,
  notReturnedAmount: 0
})
</script>
