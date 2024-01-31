<template>
  <div class="h-7 w-7 rounded-full bg-gray-50">
    <EnglishIcon
      v-if="locale === 'no'"
      class="h-7 cursor-pointer"
      @click="switchLanguage('en')"
    />
    <NorwegianIcon
      v-if="locale === 'en'"
      class="h-7 cursor-pointer"
      @click="switchLanguage('no')"
    />
  </div>
  <div />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Tr from "@/i18n/translation";
import EnglishIcon from "@/components/IconComponents/EnglishIcon.vue";
import NorwegianIcon from "@/components/IconComponents/NorwegianIcon.vue";

const { locale } = useI18n();

async function switchLanguage(newLocale: string) {
  await Tr.switchLanguage(newLocale);
}
</script>
