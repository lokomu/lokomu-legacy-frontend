import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";
import $cookies from "vue-cookies";
import { useUserStore } from "@/stores/UserStore";

const API_URL = import.meta.env.VITE_BASEURL;
const notification = useNotification();

const AxiosInstance = axios.create({
  baseURL: API_URL,
});

AxiosInstance.interceptors.request.use((config) => {
  const token = $cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message || "Oops, something went wrong";
    notification.notify({
      text: message,
      type: "error",
    });

    if (error.response?.status === 401) {
      const userStore = useUserStore();
      userStore.logout();
    }

    if (!error.response) {
      error.status = -1;
      error.message = "Network error occurred";
      notification.notify({
        type: "error",
        title: "Sorry, it appears there is a network problem.",
        text: "Please check your internet connection and try again.",
      });
    }

    // TODO Change this before launch
    return Promise.reject(
      error,
      //message: error.message,
      //status: error.status,
    );
  },
);

export default AxiosInstance;
