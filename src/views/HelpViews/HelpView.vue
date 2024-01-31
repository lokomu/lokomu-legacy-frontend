<template>
  <div class="min-w-screen">
    <div
      class="absolute left-0 min-h-screen w-full bg-gradient-to-br from-green-400 to-floyd-500 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div
        class="max-w-5xl mx-auto w-full"
        :class="{ 'md:pl-[4.5rem]': userStore.isLoggedIn }"
      >
        <h2 class="text-4xl font-bold text-center text-white my-8">
          Kontakt oss
        </h2>
        <div class="bg-white rounded-lg shadow p-6 space-y-6">
          <p class="text-center text-gray-500 leading-relaxed mb-12">
            {{ contact.description }}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="text-center">
              <h4 class="font-bold text-xl mb-1 text-green-600">
                Lokaler
              </h4>
              <p>{{ contact.address }}</p>
              <p>{{ contact.city }}</p>
              <p>{{ contact.country }}</p>
            </div>
            <div class="text-center">
              <h4 class="font-bold text-xl mb-1 text-green-600">
                E-postadresse
              </h4>
              <p>{{ contact.email }}</p>
            </div>
          </div>
        </div>
        <h2 class="text-4xl font-bold text-center text-white my-8">
          Ofte stilte spørsmål
        </h2>
        <div class="bg-white rounded-lg shadow p-6 space-y-6">
          <dl
            v-for="(faqItem, index) in FAQ"
            :key="index"
          >
            <div id="faqItem">
              <div
                id="question-and-answer"
                class="select-none cursor-pointer border-2 border-green-400 mx-8 my-3 px-6 py-4 rounded-lg text-sm community"
                @click="toggle(faqItem)"
              >
                <dt
                  id="question"
                  class="font-bold text-green-600 flex justify-between"
                >
                  {{ faqItem.question }}
                </dt>
                <dd
                  v-if="faqItem.toggle"
                  class="mt-2 leading-snug text-gray-700"
                >
                  {{ faqItem.answer }}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { ref } from "vue";

const userStore = useUserStore();

const contact = {
  description:
    "Del er en gruppebasert app for deling av ting med fokus på fellesskap og bærekraft.",
  email: "kontakt@delalt.no",
  address: "Kongens gate 1",
  city: "Trondheim",
  country: "Norge",
};

interface FAQtype {
  question: string;
  answer: string;
  toggle: boolean;
}

const FAQ = ref<FAQtype[]>([
  {
    question: "Hvordan kan jeg legge ut en deling?",
    answer:
      "Ved å trykke på plus-ikonet i navigasjons-baren øverst på siden. Dette vil ta deg til et skjema for å legge ut en ny deling.",
    toggle: false,
  },
  {
    question: "Hvordan kan jeg opprette et nytt fellesskap?",
    answer:
      "Fra hovedsiden kan man trykke på pluss-person-ikonet ved siden av mine fellesskapet som vil ta deg til skjemaet for å lage en ny gruppe.",
    toggle: false,
  },
  {
    question: "Hvordan kan jeg bli med i et fellesskap?",
    answer:
      "På hovedsiden vil alle offentlige fellesskap vises. Når du trykker på ønsket gruppe vil du få muligheten til å bli med/sende medlemsforespørsel.",
    toggle: false,
  },
  {
    question: "Hva vil jeg ha tilgang til ved å logge inn/opprette en bruker?",
    answer:
      "Uten å være logget inn vil du kunne se alle offentlige fellesskap. For å kunne låne en deling må du være med i fellesskapet delingen ligger i, og for dette må du være innlogget. Du må også være innlogget for å sende medlemsforespørsel.",
    toggle: false,
  },
]);
function toggle(faqItem: FAQtype) {
  faqItem.toggle = !faqItem.toggle;
}
</script>
