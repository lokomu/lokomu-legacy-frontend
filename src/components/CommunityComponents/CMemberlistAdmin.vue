<template>
  <div>
    <InfinityLoader v-if="loading" />
    <ul v-if="members.length">
      <li
        v-for="member in members"
        :key="member.userID"
      >
        <UserAdminCard
          :requests="requests"
          :buttons="buttons"
          :user="member"
          :admin="adminID === member.userID"
          class="p-2"
          @show-message="showReqMessage($event)"
        />
      </li>
    </ul>
    <div
      v-else
      class="text-center mt-8 text-gray-500"
    >
      {{ $t("message.request.none") }}
    </div>
    <Modal
      v-if="requestMessageVisible && request"
      @close-modal="requestMessageVisible = false"
    >
      <div
        class="w-full max-w-xs mx-auto p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
      >
        <div class="flex">
          <img
            v-if="request.user.image"
            class="w-8 h-8 rounded-full shadow-lg"
            :src="request.user.image"
            alt="User image"
          >
          <PersonIcon
            v-else
            class="h-8 fill-green-500"
          />
          <div class="ml-3 text-sm font-normal">
            <span
              class="mb-1 text-sm font-semibold text-gray-900 dark:text-white"
            >{{ request.user.firstName }} {{ request.user.lastName }}</span>
            <div class="mb-2 text-sm font-normal">
              {{ request.text }}
            </div>
          </div>
        </div>
        <ColorButton
          :text="$t('button.chat')"
          button-color="blue"
          class="mt-8 mx-auto"
          @click="openChat()"
        />
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import UserAdminCard from "@/components/UserProfileComponents/UserAdminCard.vue";
import { getCommunityMembers } from "@/api/factories/CommunityFactory";
import {
  getMemberRequestsOfCommunity,
  getSpecificCommunityRequestForMember,
} from "@/api/factories/CommunityRequestFactory";
import { getUserAdminOfCommunity } from "@/api/factories/UserCommunityFactory";
import InfinityLoader from "@/components/IconComponents/InfinityLoader.vue";
import Modal from "@/components/BaseComponents/Modal.vue";
import PersonIcon from "@/components/IconComponents/PersonIcon.vue";
import { onMounted, ref } from "vue";
import { useCommunityStore } from "@/stores/CommunityStore";
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import { useChatStore } from "@/stores/ChatStore";
import { useRouter } from "vue-router";
import { CommunityRequest, IncludedButtons, User } from "@/types/entities";

const communityStore = useCommunityStore();
const chatStore = useChatStore();
const router = useRouter();

const props = defineProps<{
  buttons: IncludedButtons[];
  requests: boolean;
}>();

const members = ref<User[]>([]);
const adminID = ref<string>("");

const loading = ref<boolean>(false);
const request = ref<CommunityRequest | null>(null);
const requestMessageVisible = ref(false);

async function openChat() {
  if (request.value) {
    await chatStore.setRecipient(request.value.user);
    if (await chatStore.doesConversationExist(request.value.user.userID))
      await chatStore.getConversationID(request.value.user.userID);

    requestMessageVisible.value = false;
    if(props.requests == true) chatStore.setByRequest(true);
    else chatStore.setByRequest(false);
    chatStore.showChat = true;
    await router.push("/messages");
  }
}

async function showReqMessage(userID: string) {
  request.value = await getSpecificCommunityRequestForMember(
    communityStore.community.ID,
    userID,
  );
  requestMessageVisible.value = true;
}

onMounted(async () => {
  loading.value = true;
  if (props.requests) {
    members.value = await getMemberRequestsOfCommunity(
      communityStore.community.ID,
    );
  } else {
    members.value = await getCommunityMembers(communityStore.community.ID);
  }
  adminID.value = await getUserAdminOfCommunity(communityStore.community.ID);
  loading.value = false;
});
</script>
