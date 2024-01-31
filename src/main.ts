import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n from "./i18n";
import { createPinia } from "pinia";
import Notifications from "@kyvg/vue3-notification";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import VueCookies from "vue-cookies";
import("@/styles/main.css");
import { useScreenSizeStore } from "@/stores/ScreenSizeStore";
import { useThemeStore } from "@/stores/ThemeStore";
import { useUserStore } from "@/stores/UserStore";
import Translation from "@/i18n/translation";

export const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(VueCookies, { expires: "7d" });
app.use(Notifications);
app.use(i18n);

const screenSizeStore = useScreenSizeStore();
screenSizeStore.onResize();
window.addEventListener("resize", screenSizeStore.onResize);

const themeStore = useThemeStore();
themeStore.initTheme();
Translation.switchLanguage(Translation.getDefaultLocale());

const userStore = useUserStore();
const $cookies = VueCookies;
if (!$cookies.isKey("authToken")) userStore.logout();

app.mount("#app");
