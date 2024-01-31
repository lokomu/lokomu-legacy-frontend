<template>
  <main class="grid h-screen place-items-center py-24 px-6 sm:py-32 lg:px-8">
    <div class="flex flex-col items-center text-center">
      <p class="text-base font-semibold text-floyd-500 dark:text-floyd-400">
        404
      </p>
      <h1
        class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-5xl"
      >
        {{ $t("message.404.title") }}
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
        {{ $t("message.404.message") }}
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="rounded-md bg-floyd-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ $t("message.404.home") }}
        </router-link>
        <router-link
          to="/help"
          class="text-sm font-semibold text-gray-900 dark:text-white"
        >
          {{ $t("message.404.support") }}
          <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
    </div>
  </main>
</template>
