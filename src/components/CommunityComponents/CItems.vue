<template>
  <div class="min-h-screen">
    <div
      id="headline"
      class="text-lg md:text-xl shadow rounded-b-3xl dark:shadow-gray-800 mb-4 dark:text-white font-normal text-center p-3"
    >
      {{ $t("menu.community.items") }}
    </div>
    <div class="flex flex-col justify-center">
      <div
        v-if="
          !communityStore.myCommunitiesItems ||
            !communityStore.myCommunitiesItems.length
        "
      >
        <p class="text-center text-gray-500 h-10">
          {{ $t("message.item.none") }}<br>{{ $t("message.item.wait") }}
        </p>
      </div>
      <div
        v-else
        class="p-4 w-full columns-1 xs:columns-2 md:columns-3 lg:columns-4 gap-4"
      >
        <div
          v-for="item in communityStore.myCommunitiesItems"
          :key="item"
          class="mb-4"
        >
          <ItemCard
            :image="item.image"
            :title="item.title"
            @click="goToItemInfoPage(item)"
          />
        </div>
      </div>
      <Modal
        v-if="openBorrowModal && itemInfo"
        @close-modal="openBorrowModal = false"
      >
        <BorrowInfo
          :item="itemInfo"
          :my-item="false"
          @closes-modal="openBorrowModal = false"
        />
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onActivated, ref } from "vue";
import ItemCard from "@/components/ItemComponents/ItemCard.vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import BorrowInfo from "@/components/BorrowComponents/BorrowInfo.vue";
import { useCommunityStore } from "@/stores/CommunityStore";
import { Item } from "@/types/entities";

const itemInfo = ref<Item | null>(null);
const openBorrowModal = ref(false);
const communityStore = useCommunityStore();

onActivated(async () => {
  await communityStore.updateMyCommunitiesItems();
});

async function goToItemInfoPage(itemInformation: Item) {
  itemInfo.value = itemInformation;
  openBorrowModal.value = true;
}
</script>
