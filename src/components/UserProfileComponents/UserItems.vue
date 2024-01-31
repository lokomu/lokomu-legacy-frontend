<template>
  <div class="max-w-5xl mx-auto pb-20">
    <div
      id="headline"
      class="text-lg md:text-xl shadow rounded-b-3xl dark:shadow-gray-800 mb-4 dark:text-white font-normal text-center p-3"
    >
      {{ $t("title.item.my") }}
    </div>
    <!-- Search field -->
    <div
      id="searchComponent"
      class="relative mx-4"
    >
      <SearchIcon
        class="absolute mt-3.5 left-0 flex items-center pl-3 h-6 fill-black dark:fill-white"
      />
      <input
        id="searchUsersInput"
        v-model="search"
        type="text"
        class="w-full z-10 py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-3xl dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-green-700 dark:focus:border-green-700 focus:outline-none focus:ring"
        :placeholder="$t('placeholder.item.search')"
        @change="searchWritten"
      >
    </div>
    <div class="w-full p-4">
      <!-- Shows items based on search field input -->
      <div class="columns-1 xs:columns-2 md:columns-3 lg:columns-4 gap-4">
        <div
          v-for="item in showSearchedItems
            ? searchedItems
            : communityStore.myItems"
          :id="item.itemID"
          :key="item.itemID"
          class="relative mb-4"
        >
          <ItemCard
            v-if="readyToShowItemCard"
            :title="item.title"
            :image="item.image"
            @click="showEditModal(item.itemID)"
          />

          <!-- Dropdown menu with options for editing an item and deleting an item -->
          <TripleDotButton
            class="absolute top-1 right-1"
            @click="openDotMenu(item)"
          />
          <div
            v-show="item.toggle"
            class="absolute top-1 right-9 w-24"
          >
            <ul
              class="z-20 absolute bg-white border-blue-400 overflow-hidden border rounded-xl"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <button
                  class="w-full py-2 px-4 text-sm text-gray-700"
                  @click="showEditModal(item.itemID)"
                >
                  {{ $t("menu.item.edit") }}
                </button>
              </li>
              <li>
                <button
                  class="w-full py-2 px-4 text-sm text-red-500"
                  @click="goToDeleteItem(item.itemID)"
                >
                  {{ $t("menu.item.delete") }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-if="itemEditOn"
      @close-modal="hideEditModal()"
    >
      <ItemEdit
        :item-i-d="itemID"
        @closes-modal="hideEditModal()"
      />
    </Modal>
    <Modal
      v-if="readyToDelete"
      @close-modal="readyToDelete = false"
    >
      <ActionMessage
        :title="$t('message.delete_item_action.title')"
        :message="$t('message.delete_item_action.message')"
        :action-text="$t('message.delete_item_action.action')"
        @close="readyToDelete = false"
        @action="deleteItem"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TripleDotButton from "@/components/BaseComponents/TripleDotButton.vue";
import { deleteItem as delItem } from "@/api/factories/ItemFactory";
import ItemCard from "@/components/ItemComponents/ItemCard.vue";
import ItemEdit from "@/components/ItemComponents/ItemEdit";
import Modal from "@/components/BaseComponents/Modal";
import SearchIcon from "@/components/IconComponents/SearchIcon";
import ActionMessage from "@/components/BaseComponents/ActionMessage";
import { useI18n } from "vue-i18n";
import { useNotification } from "@kyvg/vue3-notification";
import { useCommunityStore } from "@/stores/CommunityStore";

const { t } = useI18n();
const notifications = useNotification();

const itemEditOn = ref(false);
const itemID = ref("");
const chosenItem = ref(null);
const showItems = ref(true);
const showSearchedItems = ref(false);
const search = ref("");
const readyToDelete = ref(false);
const readyToShowItemCard = ref(false);

const searchedItems = computed(() => {
  let filteredItems;

  filteredItems = communityStore.myItems.filter((p) =>
    p.title.toLowerCase().includes(search.value.toLowerCase()),
  );

  return filteredItems;
});

const communityStore = useCommunityStore();

function showEditModal(ItemID) {
  hideAllDotMenues();
  itemID.value = ItemID;
  itemEditOn.value = true;
}

function hideEditModal() {
  itemEditOn.value = false;
  itemID.value = "";
}

function hideAllDotMenues() {
  for (let i = 0; i < communityStore.myItems.length; i++) {
    communityStore.myItems[i].toggle = false;
  }
}

function openDotMenu(item) {
  if (item.toggle === false) {
    hideAllDotMenues();
    item.toggle = true;
  } else {
    item.toggle = false;
  }
}

function goToDeleteItem(item) {
  hideAllDotMenues();
  chosenItem.value = item;
  readyToDelete.value = true;
}

async function deleteItem() {
  await delItem(chosenItem.value);
  await communityStore.fetchMyItems();
  await communityStore.fetchCommunityItems();
  readyToDelete.value = false;
  notifications.notify(t("notification.item.deleted"));
}

function searchWritten() {
  if (search.value.length > 0) {
    showItems.value = false;
    showSearchedItems.value = true;
  } else {
    showItems.value = true;
    showSearchedItems.value = false;
  }
}

communityStore.updateMyItems();
readyToShowItemCard.value = true;
</script>
