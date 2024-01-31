<template>
  <div class="text-center overflow-x-hidden px-4">
    <div
      class="bg-gray-50 dark:bg-gray-950 mx-auto rounded-b-[2rem] rounded-t-[4rem] overflow-x-auto scrollbar-sm inline-block max-w-full md:border-r md:border-b border-blue-50 dark:border-gray-900"
    >
      <div class="flex flex-nowrap">
        <CCard
          v-for="(community, i) in communities"
          :key="i"
          :community-name="community.name"
          :community-image="community.image"
          :open="community.visibility === 2"
          class="flex-shrink-0 p-2"
          @click="selectCommunity(community)"
        />
      </div>
    </div>
    <Modal
      v-if="requestOpen && requestCommunity"
      @close-modal="requestOpen = false"
    >
      <CRequest
        :community="requestCommunity"
        @closes-modal="requestOpen = false"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import CCard from "@/components/CommunityComponents/CCard.vue";
import { useRouter } from "vue-router";
import { useCommunityStore } from "@/stores/CommunityStore";
import { ref } from "vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import CRequest from "@/components/CommunityComponents/CRequest.vue";
import { Community } from "@/types/entities";
const props = defineProps<{
  communities: Community[];
  member: boolean;
}>();

const router = useRouter();
const communityStore = useCommunityStore();

const requestOpen = ref<boolean>(false);
const requestCommunity = ref<Community | null>(null);

function selectCommunity(community: Community) {
  if (props.member || community.visibility === 2) {
    communityStore.updateCommunity(community);
    communityStore.member = props.member;
    router.push("/c");
  } else if (community.visibility === 1) {
    requestCommunity.value = community;
    requestOpen.value = true;
  }
}
</script>
