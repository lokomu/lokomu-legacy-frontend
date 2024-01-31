<template>
  <div class="min-w-screen">
    <div
      class="absolute left-0 min-h-screen w-full bg-gradient-to-bl from-green-400 to-floyd-500 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
    >
      <div
        class="max-w-5xl mx-auto w-full"
        :class="{ 'md:pl-[4.5rem]': userStore.isLoggedIn }"
      >
        <h2 class="text-4xl font-bold text-center text-white my-8">
          Privacy Policy
        </h2>
        <div class="bg-white rounded-lg shadow p-6 space-y-6">
          <p class="text-gray-500 leading-relaxed mb-12">
            We at Company Name are committed to protecting your privacy. This
            Privacy Policy applies to both our website and our subscription
            service. This Privacy Policy governs our data collection,
            processing, and usage practices. By using our services, you consent
            to the data practices described in this Privacy Policy. If you do
            not agree with the data practices described in this Privacy Policy,
            you should not use our services.
          </p>
          <h3 class="font-bold text-xl text-green-600">
            Information We Collect
          </h3>
          <p class="text-gray-500 leading-relaxed mb-6">
            We collect information from you when you register on our site, place
            an order, subscribe to our newsletter, or fill out a form. When
            ordering or registering on our site, as appropriate, you may be
            asked to enter your name, email address, mailing address, phone
            number, or credit card information. You may, however, visit our site
            anonymously.
          </p>
          <h3 class="font-bold text-xl text-green-600">
            Use of Information
          </h3>
          <p class="text-gray-500 leading-relaxed mb-6">
            The information we collect from you may be used in any of the
            following ways: to personalize your experience, to improve our
            website, to improve customer service, to process transactions, and
            to send periodic emails. Your information, whether public or
            private, will not be sold, exchanged, transferred, or given to any
            other company for any reason whatsoever, without your consent, other
            than for the express purpose of delivering the purchased product or
            service requested.
          </p>
          <h3 class="font-bold text-xl text-green-600">
            Protecting Your Information
          </h3>
          <p class="text-gray-500 leading-relaxed mb-6">
            We implement a variety of security measures to maintain the safety
            of your personal information when you place an order or enter,
            submit, or access your personal information. We offer the use of a
            secure server. All supplied sensitive/credit information is
            transmitted via Secure Socket Layer (SSL) technology and then
            encrypted into our payment gateway providers' database only to be
            accessible by those authorized with special access rights to such
            systems, and are required to keep the information confidential.
          </p>
          <h3 class="font-bold text-xl text-green-600">
            Cookies
          </h3>
          <p class="text-gray-500 leading-relaxed mb-6">
            We use cookies to help us remember and process the items in your
            shopping cart and understand and save your preferences for future
            visits. If you prefer, you can choose to have your computer warn you
            each time a cookie is being sent, or you can choose to turn off all
            cookies via your browser settings. Like most websites, if you turn
            your cookies off, some of our services may not function properly.
          </p>
          <h3 class="font-bold text-xl text-green-600">
            Changes to Privacy Policy
          </h3>
          <p class="text-gray-500 leading-relaxed mb-6">
            We reserve the right to modify this Privacy Policy at any time, so
            please review it frequently. If we make material changes to this
            policy, we will notify you here, by email, or by means of a notice
            on our home page. Your continued use of our services after any
            changes or revisions to this Privacy Policy shall indicate your
            agreement with the terms of such a revised policy.
          </p>
          <h3 class="font-bold text-xl text-green-600">
            Contacting Us
          </h3>
          <p class="text-gray-500 leading-relaxed mb-6">
            If you have any questions regarding this Privacy Policy, you may
            contact us using the information below:
          </p>
          <p class="text-gray-500 leading-relaxed mb-6">
            Company Name<br>
            Street Address<br>
            City, State, ZIP<br>
            Country<br>
            Email: support@example.com<br>
            Phone: (123) 456-7890
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();
</script>
