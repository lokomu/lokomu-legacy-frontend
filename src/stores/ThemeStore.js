import { ref } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("Theme", () => {
  const theme = ref(null);

  function setTheme(newTheme) {
    theme.value = newTheme;
    localStorage.theme = newTheme;
    document
      .querySelector("html")
      .classList[newTheme === "dark" ? "add" : "remove"]("dark");
  }

  function initTheme() {
    const cachedTheme = localStorage.theme || false;
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (cachedTheme === "dark" || (userPrefersDark && !cachedTheme))
      setTheme("dark");
    else setTheme("light");
  }

  function toggleTheme() {
    setTheme(localStorage.theme === "light" ? "dark" : "light");
  }

  return { theme, initTheme, toggleTheme };
});
