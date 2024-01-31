<template>
  <div class="min-w-screen min-h-screen">
    <div
      class="left-0 absolute w-full h-full bg-gradient-to-br from-floyd-500 via-pink-500 to-yellow-400 flex items-center justify-center"
    >
      <div
        class="mx-auto w-full max-w-5xl rounded-xl overflow-hidden"
        :class="{ 'md:pl-[4.5rem]': userStore.isLoggedIn }"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 h-full">
          <div class="flex items-center justify-center p-8">
            <div>
              <h1 class="text-4xl font-bold text-white mb-4">
                About Us
              </h1>
              <p class="text-white text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                tincidunt arcu et orci consectetur, nec aliquam ligula
                venenatis. Nulla facilisi.
              </p>
            </div>
          </div>
          <div class="p-8 bg-white">
            <h2 class="text-2xl font-semibold">
              Our Story
            </h2>
            <p class="mt-2 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              tincidunt arcu et orci consectetur, nec aliquam ligula venenatis.
              Nulla facilisi.
            </p>
            <h2 class="mt-4 text-2xl font-semibold">
              Our Mission
            </h2>
            <p class="mt-2 text-gray-500">
              Sed vitae odio interdum, elementum ex nec, cursus diam. Integer ac
              odio dui. Vivamus eget justo ut velit gravida dapibus.
            </p>
            <h2 class="mt-4 text-2xl font-semibold">
              Our Team
            </h2>
            <p class="mt-2 text-gray-500">
              Praesent feugiat nisl non risus vestibulum aliquam. Aliquam erat
              volutpat. Proin id fringilla leo. Suspendisse eget aliquam erat.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();
</script>
