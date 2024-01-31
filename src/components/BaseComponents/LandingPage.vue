<template>
  <div class="min-h-screen">
    <div class="fixed w-screen min-h-screen animated-gradient left-0 top-0" />
    <div
      class="bg-transparent mb-[25vh] relative top-0 left-0 min-h-screen w-full flex flex-col items-center justify-center"
    >
      <!-- Welcome Section -->
      <div class="flex flex-col justify-center h-screen text-white text-center">
        <div class="text-white text-4xl font-semibold mb-4">
          {{ $t("title.welcome") }}
        </div>
        <div class="text-white text-lg mb-8">
          {{ $t("message.community.action") }}
        </div>
        <div class="w-full max-w-md">
          <div class="flex mx-4 justify-center">
            <ColorButton
              button-color="green"
              text="Login"
              class="mr-6"
              @click="openModal(1)"
            />
            <ColorButton
              button-color="blue"
              text="Sign Up"
              @click="openModal(2)"
            />
          </div>
        </div>
      </div>
      <div class="relative">
        <!-- Community Section -->
        <section
          id="community"
          class="scroll-section"
          data-step="1"
        >
          <div class="content text-white text-center">
            <CommunityIcon class="h-20 fill-white mx-auto" />
            <div class="text-4xl font-semibold mb-4">
              {{ $t("title.community.landing") }}
            </div>
            <div class="text-lg">
              {{ $t("message.community.landing") }}
            </div>
          </div>
        </section>
        <!-- Environmental Impact Section -->
        <section
          id="environment"
          class="scroll-section"
          data-step="2"
        >
          <div class="content text-white text-center">
            <ShareIcon class="h-20 fill-white mx-auto" />
            <div class="text-4xl font-semibold mb-4">
              {{ $t("title.item.landing") }}
            </div>
            <div class="text-lg">
              {{ $t("message.item.landing") }}
            </div>
          </div>
        </section>
      </div>
      <Modal
        v-if="showModal"
        @close-modal="hideModal()"
      >
        <div>
          <LoginForm
            v-show="!registerOn"
            @open-register="registerOn = true"
            @closes-modal="hideModal()"
          />
          <RegisterForm
            v-show="registerOn"
            @closes-modal="hideModal()"
          />
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/BaseComponents/Modal";
import LoginForm from "@/components/UserAuthComponents/LoginForm";
import RegisterForm from "@/components/UserAuthComponents/RegisterForm";
import {
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
} from "vue";
import scrollama from "scrollama";
import ColorButton from "@/components/BaseComponents/ColorButton";
import CommunityIcon from "@/components/IconComponents/CommunityIcon";
import ShareIcon from "@/components/IconComponents/ShareIcon";

const showModal = ref(false);
const registerOn = ref(false);
const scroller = scrollama();

function openModal(Number) {
  registerOn.value = Number !== 1;
  showModal.value = true;
}
function hideModal() {
  showModal.value = false;
  registerOn.value = false;
}
function setupScrollama() {
  const stepElements = document.querySelectorAll(".scroll-section");
  if (!stepElements || stepElements.length === 0) {
    return;
  }
  function handleStepEnter({ element }) {
    element.classList.add("is-active");
  }
  function handleStepExit({ element }) {
    element.classList.remove("is-active");
  }
  scroller
    .setup({
      step: ".scroll-section",
      offset: 0.5,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);
}

onActivated(async () => {
  await nextTick();
  setupScrollama();
});

onDeactivated(() => scroller.destroy());

onMounted(async () => {
  await nextTick();
  setupScrollama();
});

onUnmounted(() => scroller.destroy());
</script>
