<template>
  <!-- Form for editing an item -->
  <div class="bg-white dark:bg-gray-900 rounded-3xl w-full p-4">
    <div class="flex flex-col gap-4 w-full xs:w-3/4 mx-auto">
      <ShadowButton
        class="h-14 w-14 mx-auto shadow-xl"
        @click="$refs.file.click()"
      >
        <AddImageIcon class="m-auto h-8 fill-black dark:fill-white" />
      </ShadowButton>
      <!-- Title -->
      <div :class="{ error: v$.updatedItem.title.$errors.length }">
        <InputField
          id="title"
          v-model="v$.updatedItem.title.$model"
          type="text"
          name="title"
          :placeholder="t('placeholder.title')"
          :is-valid="
            v$.updatedItem.title.$dirty ? !v$.updatedItem.title.$error : null
          "
          @enter="saveClicked"
        />

        <!-- error message for title-->
        <div
          v-for="(error, index) of v$.updatedItem.title.$errors"
          :key="index"
          class="text-red-500"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Community -->
      <div
        :class="{ error: v$.updatedItem.selectedCommunities.$errors.length }"
      >
        <div
          class="overflow-auto w-full max-h-28 text-base list-none bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200"
        >
          <ul aria-labelledby="dropdownDefault">
            <li
              v-for="(community, index) in communities"
              :key="community"
              class="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150"
            >
              <label
                :for="`community-checkbox-${index}`"
                class="cursor-pointer form-check-label flex items-center justify-between text-center py-2 px-4 w-full"
              >
                <span
                  class="mx-auto pl-4 font-semibold overflow-hidden overflow-ellipsis text-black dark:text-white"
                >
                  {{ community.name }}
                </span>
                <input
                  :id="`community-checkbox-${index}`"
                  v-model="updatedItem.selectedCommunities"
                  class="h-4 w-4 bg-white border-2 border-gray-300 checked:border-green-700 checked:bg-green-700 focus:outline-none transition duration-200 mt-1 align-top cursor-pointer rounded-md"
                  type="checkbox"
                  :value="community.communityID"
                >
              </label>
            </li>
          </ul>
        </div>
        <!-- error message for communities -->
        <div
          v-for="(error, index) of v$.updatedItem.selectedCommunities.$errors"
          :key="index"
          class="text-error text-center"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Description -->
      <div :class="{ error: v$.updatedItem.description.$errors.length }">
        <TextAreaField
          id="description"
          v-model="v$.updatedItem.description.$model"
          name="description"
          :placeholder="t('placeholder.description')"
          :rows="2"
          :is-valid="
            v$.updatedItem.description.$dirty
              ? !v$.updatedItem.description.$error
              : null
          "
        />

        <!-- error message for description -->
        <div
          v-for="(error, index) of v$.updatedItem.description.$errors"
          :key="index"
          class="text-error"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Save item button -->
      <ColorButton
        class="mx-auto"
        :text="t('button.save')"
        button-color="green"
        @click="saveClicked"
      />
      <!-- Images -->
      <div class="flex flex-col">
        <input
          ref="file"
          type="file"
          class="hidden"
          accept="image/x-png,image/gif,image/jpeg"
          @change="addImage"
        >
        <div
          v-if="imageToShow"
          class="relative"
        >
          <div
            class="absolute z-10 rounded-full bg-white top-2 border right-2 p-1 cursor-pointer"
            @click="removeImage()"
          >
            <CloseIcon class="h-8 fill-black dark:fill-white" />
          </div>
          <ItemImage
            v-if="imageToShow"
            :image="imageToShow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import ItemImage from "@/components/ItemComponents/ItemImage.vue";
import { getMyItem, putItem } from "@/api/factories/ItemFactory";
import { uploadNewImage } from "@/api/factories/ImageFactory";
import { getUserCommunities } from "@/api/factories/UserCommunityFactory";

import { helpers, maxLength, required } from "@vuelidate/validators";
import AddImageIcon from "@/components/IconComponents/AddImageIcon";
import ColorButton from "@/components/BaseComponents/ColorButton";
import Compressor from "compressorjs";
import { onBeforeMount, ref } from "vue";
import ShadowButton from "@/components/BaseComponents/ShadowButton";
import CloseIcon from "@/components/IconComponents/CloseIcon";
import { useCommunityStore } from "@/stores/CommunityStore";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import InputField from "@/components/BaseComponents/InputField";
import TextAreaField from "@/components/BaseComponents/TextAreaField";

const props = defineProps({ itemID: String });
const emits = defineEmits(["closesModal"]);
const communityStore = useCommunityStore();
const notifications = useNotification();
const { t } = useI18n();

const API_URL = import.meta.env.VITE_BASEURL;

const updatedItem = ref({
  title: "",
  description: "",
  selectedCommunityID: "",
  selectedCommunities: [],
  image: null,
});
const initialItem = ref({});
const communities = ref([]);

const imageToShow = ref(null);
const imageToSend = ref(null);

const rules = {
  updatedItem: {
    title: {
      required: helpers.withMessage(
        () => t("errors.item.title_empty"),
        required,
      ),
      max: helpers.withMessage(() => t("errors.item.title_max"), maxLength(50)),
    },
    selectedCommunities: {
      required: helpers.withMessage(
        () => t("errors.item.choose_community"),
        (value) => !!value && value.length > 0,
      ),
    },
    description: {
      max: helpers.withMessage(
        () => t("errors.description_max"),
        maxLength(200),
      ),
    },
  },
};

const v$ = useVuelidate(rules, { updatedItem });

async function saveClicked() {
  v$.value.updatedItem.$touch();

  if (v$.value.$error) return;

  if (imageToSend.value)
    updatedItem.value.image = await uploadNewImage(imageToSend.value);

  let itemInfo = {
    title: updatedItem.value.title,
    description: updatedItem.value.description,
    communityIDs: updatedItem.value.selectedCommunities,
    image: updatedItem.value.image,
  };
  await putItem(initialItem.value.itemID, itemInfo);

  await communityStore.fetchCommunityItems();
  await communityStore.fetchMyItems();
  emits("closesModal");
  notifications.notify({ type: "success", title: t("notification.saved") });
}

async function addImage(event) {
  let image = event.target.files[0];

  new Compressor(image, {
    quality: 0.7,
    maxWidth: 500,
    maxHeight: 500,
    convertTypes: ["image/png", "image/webp"],
    convertSize: 100000,
    resize: "cover",

    success(result) {
      const resFile = new File([result], {
        type: result.type,
      });
      let fileReader = new FileReader();
      fileReader.onloadend = async function () {
        imageToSend.value = fileReader.result;
        imageToShow.value = URL.createObjectURL(resFile);
      };
      fileReader.readAsArrayBuffer(resFile);
    },
    error() {},
  });
  event.target.value = null;
}

function removeImage() {
  updatedItem.value.image = null;
  imageToSend.value = null;
  imageToShow.value = null;
}

onBeforeMount(async () => {
  initialItem.value = await getMyItem(props.itemID);
  communities.value = await getUserCommunities();

  if (initialItem.value.image)
    imageToShow.value = API_URL + "image/" + initialItem.value.image;

  let initialCommunities = [];
  for (let i in initialItem.value.communityIDs) {
    initialCommunities.push(initialItem.value.communityIDs[i]);
  }

  updatedItem.value = {
    title: initialItem.value.title,
    description: initialItem.value.description,
    selectedCommunityID: "",
    selectedCommunities: initialCommunities,
    image: initialItem.value.image,
  };
});
</script>
