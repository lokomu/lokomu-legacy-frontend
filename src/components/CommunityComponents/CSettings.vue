<template>
  <div>
    <ColorButton
      class="my-4 mx-auto"
      :text="$t('button.community.edit')"
      button-color="green"
      @click="CEditOn = true"
    />

    <ColorButton
      class="mx-auto"
      button-color="red"
      :text="$t('button.community.delete')"
      @click="readyToDelete = true"
    />
  </div>
  <Modal
    v-if="CEditOn"
    @close-modal="CEditOn = false"
  >
    <CEdit @closes-modal="CEditOn = false" />
  </Modal>
  <Modal
    v-if="readyToDelete"
    @close-modal="readyToDelete = false"
  >
    <ActionMessage
      :title="$t('message.delete_community_action.title')"
      :message="$t('message.delete_community_action.message')"
      :action-text="$t('message.delete_community_action.action')"
      @close="readyToDelete = false"
      @action="deleteCommunity"
    />
  </Modal>
</template>

<script setup lang="ts">
import { deleteCommunity as deleteCom } from "@/api/factories/CommunityFactory";
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import CEdit from "@/components/CommunityComponents/CEdit.vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import ActionMessage from "@/components/BaseComponents/ActionMessage.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useCommunityStore } from "@/stores/CommunityStore";

const router = useRouter();
const communityStore = useCommunityStore();

const readyToDelete = ref<boolean>(false);
const CEditOn = ref<boolean>(false);

async function deleteCommunity() {
  await deleteCom(communityStore.community.ID);
  await communityStore.fetchMyCommunities();
  readyToDelete.value = false;
  await router.push("/");
}
</script>
