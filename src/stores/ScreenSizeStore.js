import { ref } from "vue";
import { defineStore } from "pinia";
import { useDebounce } from "@/composables/useDebounce";

export const useScreenSizeStore = defineStore("ScreenSize", () => {
  const isLargeScreen = ref(window.innerWidth >= 768);
  const bottomNavigationHeight = ref(0);

  const updateIsLargeScreen = () => {
    isLargeScreen.value = window.innerWidth >= 768;
  };

  const updateBottomNavigationHeight = () => {
    const bottomBarHeight =
      window.innerHeight - document.documentElement.clientHeight;
    if (bottomBarHeight > 0) {
      bottomNavigationHeight.value = bottomBarHeight;
    }
  };

  const onResize = () => {
    updateIsLargeScreen();
    updateBottomNavigationHeight();
  };

  const debouncedOnResize = useDebounce(onResize, 100);

  updateBottomNavigationHeight();

  return { isLargeScreen, bottomNavigationHeight, onResize: debouncedOnResize };
});
