<template>
  <div
    :class="
      userStore.isLoggedIn
        ? 'relative bg-transparent'
        : 'absolute bg-white dark:bg-black'
    "
    class="left-0 w-full py-12 px-4 border-t border-gray-200 dark:border-gray-900"
  >
    <div class="mx-auto container flex flex-col items-center justify-center">
      <router-link
        to="/"
        class="mx-auto flex"
      >
        <LogoIcon class="h-10 fill-green-500 dark:fill-white" />
      </router-link>
      <h1 class="text-center text-pink-500 text-2xl font-bold pt-3">
        {{ $t("misc.slogan") }}
      </h1>
      <ul class="md:flex items-center my-6 text-base text-color">
        <li
          v-for="item in menuItems"
          :key="item.key"
          class="md:mr-6 cursor-pointer pt-4 lg:py-0"
        >
          <router-link
            :to="item.url"
            class="dark:text-white text-floyd-800 focus:underline hover:text-gray-500"
          >
            {{ $t(`misc.help.${item.key}`) }}
          </router-link>
        </li>
      </ul>
      <p class="text-floyd-900 text-sm text-color mb-16 f-f-l dark:text-white">
        {{ $t("misc.copyright") }}
      </p>
      <div
        class="flex mx-auto"
        :class="{ 'pb-20 md:pb-0': userStore.isLoggedIn }"
      >
        <LanguageSwitcher />
        <ThemeToggler class="ml-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoIcon from "@/components/IconComponents/LogoIcon.vue";
import ThemeToggler from "@/components/BaseComponents/ThemeToggler.vue";
import LanguageSwitcher from "@/components/BaseComponents/LanguageSwitcher.vue";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();

const menuItems = [
  { key: "about", url: "/about" },
  { key: "terms", url: "/terms" },
  { key: "help", url: "/help" },
  { key: "privacy", url: "/privacy" },
];
</script>
