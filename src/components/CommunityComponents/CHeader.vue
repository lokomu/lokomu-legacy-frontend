<template>
  <div
    class="flex justify-end w-full p-4 relative shadow rounded-b-3xl dark:shadow-gray-800"
  >
    <router-link
      to="/c"
      class="absolute mt-4 -translate-x-1/2 -translate-y-1/2 left-1/2 cursor-pointer text-center text-lg md:text-xl text-black dark:text-white"
    >
      {{ communityStore.community.name }}
    </router-link>
    <div>
      <ColorButton
        v-if="!communityStore.member"
        :text="$t('button.community.join')"
        button-color="green"
        @click="joinCommunity()"
      />
      <div
        v-else
        class="relative"
      >
        <MenuIcon
          class="cursor-pointer h-9 fill-black dark:fill-white"
          @click="showDropdown = !showDropdown"
        />
        <CDropdown
          v-if="showDropdown"
          :community-i-d="community.communityID"
          @open-leave-community-dialog="showLeaveModal = true"
          @open-invite-modal="showInviteModal = true"
          @close-dropdown="showDropdown = false"
        />
      </div>
    </div>
    <Modal
      v-if="showLeaveModal"
      @close-modal="showLeaveModal = false"
    >
      <ActionMessage
        :title="$t('message.leave_community_action.title')"
        :message="$t('message.leave_community_action.message')"
        :action-text="$t('message.leave_community_action.action')"
        @close="showLeaveModal = false"
        @action="leaveCommunity()"
      />
    </Modal>
    <Modal
      v-if="showInviteModal"
      @close-modal="showInviteModal = false"
    >
      <InviteLink />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import CDropdown from "@/components/CommunityComponents/CDropdown.vue";
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import {
  leaveCommunity as leaveCom,
  joinOpenCommunity,
} from "@/api/factories/UserCommunityFactory";
import MenuIcon from "@/components/IconComponents/MenuIcon.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import ActionMessage from "@/components/BaseComponents/ActionMessage.vue";
import { useCommunityStore } from "@/stores/CommunityStore";
import InviteLink from "@/components/BaseComponents/InviteLink.vue";

const router = useRouter();
const communityStore = useCommunityStore();

const showLeaveModal = ref(false);
const showInviteModal = ref(false);
const community = ref({});
const showDropdown = ref(false);

async function leaveCommunity() {
  await leaveCom(communityStore.community.ID);
  await communityStore.fetchMyCommunities();
  await communityStore.fetchNearbyCommunities();
  showLeaveModal.value = false;
  await router.push("/");
}

async function joinCommunity() {
  await joinOpenCommunity(communityStore.community.ID);
  await communityStore.fetchMyCommunities();
  await communityStore.fetchNearbyCommunities();
  communityStore.member = true;
}
</script>
