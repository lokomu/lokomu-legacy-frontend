import { defineStore } from "pinia";
import {
  createConversation as creatConversation,
  doesConversationExist as isConversationExist,
  getConversationID as getConversationId,
  getConversations,
  getMessages,
  sendMessage as sendMsg,
} from "@/api/factories/ChatFactory";
import { computed, reactive, ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useCommunityStore } from "@/stores/CommunityStore";
import { useDebounce } from "@/composables/useDebounce";

export const useChatStore = defineStore("Chat", () => {
  const userStore = useUserStore();
  const communityStore = useCommunityStore();

  const conversations = ref([]);
  const conversationID = ref(null);

  const messages = ref([]);
  const uniqueMessageIDs = ref(new Set());
  const showChat = ref(false);
  const currentPage = ref(0);
  const showLoadMore = ref(false);
  const createConversationByRequest = ref(false);

  const recipient = reactive({
    ID: "",
    name: "",
    image: null,
  });

  async function createConversation(userID) {
    const conversationCreation = {
      communityID: communityStore.community.ID,
      byRequest: createConversationByRequest.value
    }
    conversationID.value = await creatConversation(
      userID,
      conversationCreation
    );
  }

  async function doesConversationExist(userID) {
    for (let conversation of conversations.value) {
      if (conversation.recipient.userID === userID) return true;
    }
    return await isConversationExist(userID);
  }

  async function setConversation(conversationId) {
    if (conversationID.value !== conversationId) {
      conversationID.value = conversationId;
      await fetchMessages();
    }
  }

  async function getConversationID(userID) {
    for (let conversation of conversations.value) {
      if (conversation.recipient.userID === userID)
        await setConversation(conversation.conversationID);
    }
    const conversationID = await getConversationId(
      userID
    );
    await setConversation(conversationID);
  }

  function setRecipient(recipientInfo) {
    if (recipient.ID !== recipientInfo.userID) {
      resetChat();
      recipient.ID = recipientInfo.userID;
      recipient.image = recipientInfo.image
        ? import.meta.env.VITE_BASEURL + "image/" + recipientInfo.image
        : null;
      recipient.name = recipientInfo.firstName + " " + recipientInfo.lastName;
    }
  }

  async function fetchChats() {
    const data = await getConversations(userStore.currentUser.ID);
    conversations.value = data
      ? data.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp)
      : [];
  }

  async function fetchMessages() {
    if (!conversationID.value) {
      messages.value = [];
      return;
    }
    const messagesData = await getMessages(conversationID.value, 0);

    showLoadMore.value = messagesData.length === 10;
    if (messagesData.length === 10 && currentPage.value === 0){
      showLoadMore.value = true;
    }

    addNewMessages(messagesData);
  }

  async function debouncedLoadMoreMessages() {
    useDebounce(loadMoreMessages(), 3000);
  }

  async function loadMoreMessages() {
    currentPage.value++;
    const newPageMessages = await getMessages(
      conversationID.value,
      currentPage.value,
    );
    if (newPageMessages.length < 10) {
      showLoadMore.value = false;
    }
    addNewMessages(newPageMessages);
  }

  function addNewMessages(newMessages) {
    newMessages.forEach((item) => {
      if (!uniqueMessageIDs.value.has(item.ID)) {
        uniqueMessageIDs.value.add(item.ID);
        messages.value.push(item);
      }
    });
  }

  async function sendMessage(message) {
    if (conversationID.value === null) await createConversation(recipient.ID);
    const messageID = await sendMsg(conversationID.value, message);
    addMessageToConversation(messageID, message);
  }

  function setByRequest(bool){
    createConversationByRequest.value = bool;
  }

  function addMessageToConversation(messageID, messageContent) {
    const message = {
      content: messageContent,
      ID: messageID,
      timestamp: Date.now(),
      from: userStore.currentUser.ID,
    };
    uniqueMessageIDs.value.add(messageID);
    messages.value.push(message);
  }

  //TODO Should fix this
  const sortedMessages = computed(() => {
    return [...messages.value].sort(
      (a, b) => (a?.createdAt || a.timestamp) - (b?.createdAt || b.timestamp),
    );
  });

  function resetChat() {
    recipient.ID = null;
    recipient.name = null;
    recipient.image = null;
    conversationID.value = null;
    messages.value = [];
    uniqueMessageIDs.value = new Set();
    currentPage.value = 0;
    showLoadMore.value = false;
    createConversationByRequest.value = false;
  }

  function reset() {
    resetChat();
    showChat.value = false;
    conversations.value = [];
  }

  return {
    conversations,
    sortedMessages,
    showChat,
    recipient,
    showLoadMore,
    doesConversationExist,
    getConversationID,
    setConversation,
    fetchChats,
    fetchMessages,
    sendMessage,
    setRecipient,
    setByRequest,
    reset,
    debouncedLoadMoreMessages,
  };
});
