<template>
  <div class="min-w-screen min-h-screen">
    <div
      class="left-0 min-h-full w-full absolute bg-gradient-to-br from-green-500 to-floyd-500 py-12 px-4 sm:px-6 lg:px-8 flex items-center"
    >
      <div
        class="max-w-5xl mx-auto w-full"
        :class="{ 'md:pl-[4.5rem]': userStore.isLoggedIn }"
      >
        <h1 class="text-4xl font-bold text-center text-white mb-8">
          Terms of Use
        </h1>
        <div class="bg-white rounded-lg shadow p-6 space-y-6">
          <section>
            <h2 class="text-2xl font-semibold text-green-600 mb-2">
              1. Introduction
            </h2>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              volutpat velit et est bibendum, a feugiat odio semper.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-green-600 mb-2">
              2. User Agreement
            </h2>
            <p class="text-gray-700">
              Vestibulum faucibus mauris eget nisi finibus, eu sollicitudin nunc
              sagittis. Sed auctor libero ut nisi faucibus, in dictum arcu
              suscipit.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-green-600 mb-2">
              3. Privacy Policy
            </h2>
            <p class="text-gray-700">
              Praesent condimentum urna at neque ullamcorper, nec bibendum enim
              tincidunt. In hac habitasse platea dictumst.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-green-600 mb-2">
              4. Modification of Terms
            </h2>
            <p class="text-gray-700">
              Vivamus non purus in ipsum fringilla lacinia. Pellentesque iaculis
              venenatis velit, ut venenatis ex.
            </p>
          </section>

          <section>
            <h2 class="text-2xl font-semibold text-green-600 mb-2">
              5. Intellectual Property
            </h2>
            <p class="text-gray-700">
              Curabitur bibendum, neque at dapibus tincidunt, lectus quam
              malesuada est, id suscipit lacus sapien vel ante.
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();
</script>
