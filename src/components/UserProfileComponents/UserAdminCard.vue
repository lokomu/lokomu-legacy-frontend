<template>
  <div
    class="select-none flex items-center bg-zinc-50 dark:bg-gray-900 rounded-3xl shadow-md"
  >
    <div class="flex flex-col justify-center items-center mr-4">
      <img
        v-if="user.image"
        class="h-10 w-10 rounded-full shadow-lg object-cover"
        alt="User image"
        :src="API_URL + 'image/' + user.image"
        loading="lazy"
      >
      <PersonIcon
        v-else
        class="h-10 rounded-full shadow-lg fill-green-500"
      />
    </div>
    <div class="flex-1 pl-1 flex">
      <div class="font-medium text-black dark:text-white pr-2">
        {{ user.firstName }} {{ user.lastName }}
      </div>
      <CommentIcon
        v-if="requests"
        class="cursor-pointer ml-10 fill-black h-8 dark:fill-white"
        @click="$emit('showMessage', user.userID)"
      />
    </div>
    <div class="flex flex-row gap-4">
      <div
        v-if="admin"
        class="grid place-items-center font-medium dark:text-white"
      >
        <p>Admin</p>
      </div>
      <ColorButton
        v-if="
          buttons.includes('chat') && userStore.currentUser.ID !== user.userID
        "
        :text="$t('button.community.chat')"
        button-color="blue"
        @click="openChatWithUser()"
      />
      <ColorButton
        v-if="
          buttons.includes('kick') && userStore.currentUser.ID !== user.userID
        "
        button-color="red"
        :text="$t('button.community.kick')"
        @click="kickUserFromCommunity()"
      />
      <ColorButton
        v-if="buttons.includes('accept')"
        button-color="green"
        :text="$t('button.request.accept')"
        @click="acceptMemberRequest()"
      />
      <ColorButton
        v-if="buttons.includes('reject')"
        button-color="red"
        :text="$t('button.request.decline')"
        @click="rejectMemberRequest()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import ColorButton from "@/components/BaseComponents/ColorButton.vue";
import CommentIcon from "@/components/IconComponents/CommentIcon.vue";
import PersonIcon from "@/components/IconComponents/PersonIcon.vue";
import { useChatStore } from "@/stores/ChatStore";
import {
  acceptUserIntoCommunity,
  rejectUserFromCommunity,
} from "@/api/factories/CommunityRequestFactory";
import { kickUserFromCommunity as kickUserFromCom } from "@/api/factories/UserCommunityFactory";
import { useCommunityStore } from "@/stores/CommunityStore";
import { useUserStore } from "@/stores/UserStore";
import { IncludedButtons, User } from "@/types/entities";

const API_URL = import.meta.env.VITE_BASEURL;

const chatStore = useChatStore();
const router = useRouter();
const notifications = useNotification();
const { t } = useI18n();
const communityStore = useCommunityStore();
const userStore = useUserStore();

defineEmits(["showMessage"]);

const props = defineProps<{
  user: User;
  buttons: IncludedButtons[];
  requests: boolean;
  admin: boolean;
}>();

async function openChatWithUser() {
  await chatStore.setRecipient(props.user);
  if (await chatStore.doesConversationExist(props.user.userID)){
    await chatStore.getConversationID(props.user.userID);
  }
 chatStore.setByRequest(false);
  chatStore.showChat = true;
  await router.push("/messages");
}

function kickUserFromCommunity() {
  kickUserFromCom(communityStore.community.ID, props.user.userID);
  notifications.notify({ title: t("notification.community.kicked") });
}

function acceptMemberRequest() {
  acceptUserIntoCommunity(communityStore.community.ID, props.user.userID);
  notifications.notify({
    type: "success",
    title: t("notification.request.accepted"),
  });
}

function rejectMemberRequest() {
  rejectUserFromCommunity(communityStore.community.ID, props.user.userID);
  notifications.notify(t("notification.request.declined"));
}
</script>
