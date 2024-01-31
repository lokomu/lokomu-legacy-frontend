<template>
  <div>
    <div>
      <CHeader
        :admin="true"
        :member="true"
      />
      <div
        class="flex border-b border-gray-200 dark:border-gray-700 overflow-y-hidden"
      >
        <button
          v-for="(tab, index) in tabs"
          :key="tab"
          class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
          :class="[currentTab === index ? activeClasses : inactiveClasses]"
          @click="changeTab(index)"
        >
          {{ tab }}
        </button>
      </div>
      <CMemberlistAdmin
        v-if="currentTab === 0"
        :requests="false"
        :buttons="['chat', 'kick']"
      />
      <CMemberlistAdmin
        v-if="currentTab === 1"
        :requests="true"
        :buttons="['accept', 'reject']"
      />
      <CSettings v-if="currentTab === 2" />
    </div>
  </div>
</template>

<script>
import CMemberlistAdmin from "@/components/CommunityComponents/CMemberlistAdmin.vue";
import CSettings from "@/components/CommunityComponents/CSettings.vue";
import CHeader from "@/components/CommunityComponents/CHeader.vue";

export default {
  name: "CAdminView",
  components: {
    CHeader,
    CMemberlistAdmin,
    CSettings,
  },
  data() {
    return {
      tabs: [
        this.$t("menu.community.members"),
        this.$t("menu.community.requests"),
        this.$t("menu.community.settings"),
      ],
      currentTab: 0,
      activeClasses:
        "text-green-700 border-green-700 dark:border-green-300 dark:text-green-300",
      inactiveClasses:
        "text-gray-700 border-transparent dark:text-white cursor-base hover:border-gray-400",
    };
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
    },
  },
};
</script>
