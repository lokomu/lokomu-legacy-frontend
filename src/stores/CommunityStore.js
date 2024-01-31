import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {
  getCommunitiesNearUser,
  getCommunity as getCom,
  getCommunityMembers,
} from "@/api/factories/CommunityFactory";
import {getItemsInCommunity, getOtherUserItems} from "@/api/factories/CommunityItemFactory";
import {
  getUserCommunities,
} from "@/api/factories/UserCommunityFactory";
import { getUserItems } from "@/api/factories/ItemFactory";

export const useCommunityStore = defineStore("Community", () => {
  const community = reactive({
    ID: "",
    name: "",
    location: "",
    image: null,
  });
  const member = ref(false);
  const communityItems = ref(null);
  const communityMembers = ref(null);
  const nearbyCommunities = ref(null);
  const myItems = ref(null);
  const myCommunities = ref(null);
  const myCommunitiesItems = ref(null);

  async function updateCommunityItems() {
    if (communityItems.value === null) {
      await fetchCommunityItems();
    }
  }
  async function fetchCommunityItems() {
    if (!community.ID) return;
    const itemsData = await getItemsInCommunity(community.ID);

    if (itemsData && itemsData.length > 0) {
      communityItems.value = itemsData;
    } else {
      communityItems.value = [];
    }
  }

  async function updateCommunityMembers() {
    if (communityMembers.value === null) {
      await fetchCommunityMembers();
    }
  }
  async function fetchCommunityMembers() {
    if (!community.ID) return;
    const membersData = await getCommunityMembers(community.ID);
    communityMembers.value = membersData ? membersData : [];
  }

  async function updateNearbyCommunities() {
    if (nearbyCommunities.value === null) {
      await fetchNearbyCommunities();
    }
  }
  async function fetchNearbyCommunities() {
    const nearbyData = await getCommunitiesNearUser();
    nearbyCommunities.value = nearbyData ? nearbyData : [];
  }

  async function updateMyItems() {
    if (myItems.value === null) {
      await fetchMyItems();
    }
  }
  async function fetchMyItems() {
    const itemsData = await getUserItems();

    if (itemsData && itemsData.length > 0) {
      myItems.value = itemsData;
    } else {
      myItems.value = [];
    }
  }

  async function updateMyCommunities() {
    if (myCommunities.value === null) {
      await fetchMyCommunities();
    }
  }
  async function fetchMyCommunities() {
    const communityData = await getUserCommunities();
    myCommunities.value = communityData ? communityData : [];
  }

  async function updateMyCommunitiesItems() {
    if (myCommunitiesItems.value === null) {
      await fetchMyCommunitiesItems();
    }
  }
  async function fetchMyCommunitiesItems() {
    const itemsData = await getOtherUserItems();

    if (itemsData && itemsData.length > 0) {
      myCommunitiesItems.value = itemsData.map((item) => ({
        ...item,
        img: item.firstImage || null,
      }));
    } else {
      myCommunitiesItems.value = [];
    }
  }

  async function updateCommunity(communityInfo) {
    if (community.ID !== communityInfo.communityID) {
      await setCommunity(communityInfo);
    }
  }
  async function getCommunity(communityID) {
    const communityInfo = await getCom(communityID);
    setCommunity(communityInfo);
  }
  function setCommunity(communityInfo) {
    communityItems.value = null;
    communityMembers.value = null;
    member.value = false;
    community.ID = communityInfo.communityID;
    community.name = communityInfo.name;
    community.location = communityInfo.location;
    community.image = communityInfo.image;
  }

  function reset() {
    community.ID = "";
    community.name = "";
    community.location = "";
    community.image = null;
    communityItems.value = null;
    communityMembers.value = null;
    nearbyCommunities.value = null;
    myItems.value = null;
    myCommunities.value = null;
    myCommunitiesItems.value = null;
  }
  return {
    community,
    communityItems,
    nearbyCommunities,
    myItems,
    myCommunities,
    myCommunitiesItems,
    updateCommunity,
    getCommunity,
    setCommunity,
    member,
    fetchCommunityItems,
    updateCommunityItems,
    updateCommunityMembers,
    fetchCommunityMembers,
    updateNearbyCommunities,
    fetchNearbyCommunities,
    updateMyItems,
    fetchMyItems,
    updateMyCommunities,
    fetchMyCommunities,
    updateMyCommunitiesItems,
    reset,
  };
});
