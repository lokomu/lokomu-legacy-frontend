<template>
  <teleport to="#modals">
    <div
      ref="modalRef"
      class="fixed z-40 flex flex-col justify-center w-screen inset-0 h-screen bg-black bg-opacity-90"
      @click.stop="close()"
    >
      <div
        class="modal-content relative mx-auto p-4 w-full max-w-md"
        @click.stop
      >
        <div class="w-full h-12">
          <div
            class="cursor-pointer flex h-10 w-10 hover:bg-gray-900 active:bg-gray-800 rounded-full float-right"
            @click.stop="close()"
          >
            <CloseIcon class="m-auto h-8 fill-white" />
          </div>
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import CloseIcon from "@/components/IconComponents/CloseIcon.vue";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const emit = defineEmits<{ closeModal: [] }>();
const modalRef = ref<HTMLElement | null>(null);

function close(): void {
  emit("closeModal");
}

onMounted(() => {
  if (modalRef.value) {
    disableBodyScroll(modalRef.value as HTMLElement);
  }
});

onBeforeUnmount(() => {
  if (modalRef.value) {
    enableBodyScroll(modalRef.value as HTMLElement);
  }
});
</script>

<style scoped>
.modal-content {
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  overscroll-behavior: none;
}
.modal-content::-webkit-scrollbar-track {
  @apply rounded-lg;
}
</style>
