<template>
  <div>
    <InfinityLoader
      v-if="loading"
      class="mx-auto"
    />
    <section v-else>
      <CHeader />
      <div
        v-if="
          !communityStore.communityItems ||
            !communityStore.communityItems.length
        "
        class="h-[calc(100vh-4.5rem)] text-center text-black dark:text-white flex flex-col justify-center"
      >
        {{ $t("message.community.empty") }}
      </div>
      <div
        v-else
        class="p-4 flex items-center justify-center pb-20"
      >
        <div
          class="w-full columns-1 xs:columns-2 md:columns-3 lg:columns-4 gap-4"
        >
          <div
            v-for="(item, i) in communityStore.communityItems"
            :key="i"
            class="mb-4"
          >
            <ItemCard
              :title="item.title"
              :image="item.image"
              @click="goToItemInfoPage(item)"
            />
          </div>
        </div>
      </div>
    </section>
    <Modal
      v-if="borrowInfoOpen && itemInfo"
      @close-modal="hideBorrowModal()"
    >
      <BorrowInfo
        :item="itemInfo"
        :my-item="myItem"
        @closes-modal="hideBorrowModal"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import ItemCard from "@/components/ItemComponents/ItemCard.vue";
import CHeader from "@/components/CommunityComponents/CHeader.vue";
import InfinityLoader from "@/components/IconComponents/InfinityLoader.vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import BorrowInfo from "@/components/BorrowComponents/BorrowInfo.vue";
import { useUserStore } from "@/stores/UserStore";
import { onActivated, ref } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import { getIfUserAlreadyInCommunity } from "@/api/factories/UserCommunityFactory";
import { useCommunityStore } from "@/stores/CommunityStore";
import { Item } from "@/types/entities";

const userStore = useUserStore();
const notification = useNotification();
const { t } = useI18n();
const communityStore = useCommunityStore();

const itemInfo = ref<Item | null>(null);
const loading = ref(false);
const borrowInfoOpen = ref(false);
const myItem = ref(false);

function hideBorrowModal() {
  borrowInfoOpen.value = false;
  itemInfo.value = null;
}

async function goToItemInfoPage(itemInformation: Item) {
  if (itemInformation.user.userID === userStore.currentUser.ID) {
    borrowInfoOpen.value = true;
    itemInfo.value = itemInformation;
    myItem.value = true;
    return;
  }
  if (communityStore.member) {
    myItem.value = false;
    itemInfo.value = itemInformation;
    borrowInfoOpen.value = true;
  } else {
    notification.notify({
      type: "warn",
      title: t("notification.community.member"),
    });
  }
}

async function checkMembership() {
  const memberData = await getIfUserAlreadyInCommunity(
    communityStore.community.ID,
  );
  communityStore.member = memberData ? memberData : false;
}

onActivated(async () => {
  loading.value = true;
  await checkMembership();
  await communityStore.updateCommunityItems();
  loading.value = false;
});
</script>
