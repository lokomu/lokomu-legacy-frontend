import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import $cookies from "vue-cookies";
import { clearRepositoryInstances } from "@/api/Repositories";

export const useUserStore = defineStore(
  "User",
  () => {
    const isLoggedIn = ref(false);
    const currentUser = reactive({
      ID: "",
      name: "",
      image: null,
    });
    const adminList = ref([]);

    async function login(authResponse) {
      setCurrentUser(authResponse.user);
      $cookies.set("authToken", authResponse.authToken, "14d");
      isLoggedIn.value = true;
    }

    function logout() {
      $cookies.remove("authToken");
      isLoggedIn.value = false;
      reset();
    }

    function setCurrentUser(userInfo) {
      currentUser.ID = userInfo.userID;
      currentUser.name = userInfo.firstName + " " + userInfo.lastName;
      currentUser.image = userInfo.image
        ? import.meta.env.VITE_BASEURL + "image/" + userInfo.image
        : null;
    }

    function addAdminList(communityIDArray) {
      if (!Array.isArray(communityIDArray)) return;
      const validIDs = communityIDArray.filter((id) => typeof id === "string");
      adminList.value.push(...validIDs);
    }

    function addAdmin(communityID) {
      if (typeof communityID !== "string") return;
      adminList.value.push(communityID);
    }

    function reset() {
      currentUser.ID = "";
      currentUser.name = "";
      currentUser.image = null;
      adminList.value = [];
      clearRepositoryInstances();
    }
    return {
      isLoggedIn,
      currentUser,
      adminList,
      logout,
      login,
      addAdminList,
      addAdmin,
      setCurrentUser,
    };
  },
  { persist: true },
);
