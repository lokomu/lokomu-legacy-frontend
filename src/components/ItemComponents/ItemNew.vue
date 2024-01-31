<template>
  <div class="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden w-full p-4">
    <div
      v-if="
        !communityStore.myCommunities || communityStore.myCommunities.length < 1
      "
      class="text-center text-blue-700 dark:text-blue-300 text-md font-medium my-2"
    >
      {{ t("errors.item.no_community") }}
    </div>
    <div
      v-else
      class="flex flex-col gap-4 mx-auto w-full xs:w-3/4"
    >
      <input
        ref="file"
        type="file"
        class="hidden"
        accept="image/x-png,image/gif,image/jpeg"
        @change="addImage"
      >
      <ShadowButton
        v-if="!imageToShow"
        class="h-14 w-14 mx-auto shadow-xl"
        @click="$refs.file.click()"
      >
        <AddImageIcon class="m-auto h-8 fill-black dark:fill-white" />
      </ShadowButton>
      <!-- Title -->
      <div :class="{ error: v$.item.title.$errors.length }">
        <InputField
          id="title"
          v-model="v$.item.title.$model"
          type="text"
          name="title"
          :placeholder="t('placeholder.title')"
          :is-valid="v$.item.title.$dirty ? !v$.item.title.$error : null"
          @enter="saveClicked"
        />
        <!-- error message for title-->
        <div
          v-for="(error, index) of v$.item.title.$errors"
          :key="index"
          class="text-red-500 text-center"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Community -->
      <div>
        <div class="w-full">
          <div
            class="overflow-auto w-full max-h-28 text-base list-none bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200"
          >
            <ul aria-labelledby="dropdownDefault">
              <li
                v-for="(community, index) in communityStore.myCommunities"
                :key="community"
                class="hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150"
              >
                <label
                  :for="`community-checkbox-${index}`"
                  class="cursor-pointer form-check-label flex items-center justify-between text-center py-2 px-4 w-full"
                >
                  <span
                    class="pl-4 mx-auto font-semibold overflow-hidden overflow-ellipsis text-black dark:text-white"
                  >
                    {{ community.name }}
                  </span>
                  <input
                    :id="`community-checkbox-${index}`"
                    class="h-4 w-4 bg-white border-2 border-gray-300 checked:border-green-700 checked:bg-green-700 focus:outline-none transition duration-200 mt-1 align-top cursor-pointer rounded-md"
                    type="checkbox"
                    :value="community.communityID"
                    @change="onChangeCommunity($event)"
                  >
                </label>
              </li>
            </ul>
          </div>
          <!-- Error message for community -->
          <label class="text-center text-red-500 text-sm block">
            {{ communityErrorMessage }}
          </label>
        </div>
      </div>

      <!-- Description -->
      <div
        class="flex flex-col"
        :class="{ error: v$.item.description.$errors.length }"
      >
        <!-- Add a new input for the checkbox -->
        <div
          class="flex mx-auto cursor-pointer inline-block"
          @click="showDescription = !showDescription"
        >
          <div>
            <PlusIcon
              class="h-8 cursor-pointer transition-all fill-black dark:fill-white"
              :class="{ 'rotate-45': showDescription }"
            />
          </div>
          <div class="my-auto text-black dark:text-white">
            {{ t("placeholder.description") }}
          </div>
        </div>

        <!-- Conditionally render the text area based on the checked state -->
        <div v-if="showDescription">
          <TextAreaField
            id="description"
            v-model="v$.item.description.$model"
            name="description"
            :rows="2"
            :is-valid="
              v$.item.description.$dirty ? !v$.item.description.$error : null
            "
          />
          <!-- error message for description -->
          <div
            v-for="(error, index) of v$.item.description.$errors"
            :key="index"
            class="text-red-500 text-center"
          >
            <div class="text-red-500 text-sm">
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <!-- Save item button -->
      <ColorButton
        class="mx-auto"
        :text="t('button.item.share')"
        button-color="green"
        @click="saveClicked"
      />
      <div
        v-if="imageToShow"
        class="relative"
      >
        <div
          class="z-10 rounded-full bg-white absolute top-2 right-2 border p-1 cursor-pointer"
          @click="removeImage()"
        >
          <CloseIcon class="h-8 fill-black" />
        </div>
        <ItemImage :image="imageToShow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { uploadNewImage } from "@/api/factories/ImageFactory";
import { postNewItem } from "@/api/factories/ItemFactory";
import ItemImage from "@/components/ItemComponents/ItemImage.vue";
import { helpers, maxLength, required } from "@vuelidate/validators";
import ColorButton from "@/components/BaseComponents/ColorButton";
import AddImageIcon from "@/components/IconComponents/AddImageIcon";
import Compressor from "compressorjs";
import PlusIcon from "@/components/IconComponents/PlusIcon";
import InputField from "@/components/BaseComponents/InputField";
import { useCommunityStore } from "@/stores/CommunityStore";
import { onMounted, ref } from "vue";
import ShadowButton from "@/components/BaseComponents/ShadowButton";
import CloseIcon from "@/components/IconComponents/CloseIcon";
import { useI18n } from "vue-i18n";
import { useNotification } from "@kyvg/vue3-notification";
import TextAreaField from "@/components/BaseComponents/TextAreaField";

const emits = defineEmits(["closesModal", "openNewCommunity"]);
const communityStore = useCommunityStore();
const { t } = useI18n();
const notifications = useNotification();

onMounted(async () => {
  await communityStore.updateMyCommunities();
  if (
    !communityStore.myCommunities ||
    communityStore.myCommunities.length < 1
  ) {
    emits("openNewCommunity");
  }
});

const item = ref({
  title: "",
  description: "",
  type: "",
  image: null,
  selectedCommunityID: -1,
  selectedCommunitys: [],
});
const imageToShow = ref(null);
const communityErrorMessage = ref("");
const imageToSend = ref(null);
const showDescription = ref(false);

const rules = {
  item: {
    title: {
      required: helpers.withMessage(
        () => t("errors.item.title_empty"),
        required,
      ),
      max: helpers.withMessage(() => t("errors.item.title_max"), maxLength(25)),
    },
    description: {
      max: helpers.withMessage(
        () => t("errors.description_max"),
        maxLength(100),
      ),
    },
  },
};

const v$ = useVuelidate(rules, { item });

function checkValidation() {
  v$.value.item.$touch();
  if (v$.value.item.$invalid || item.value.selectedCommunitys.length === 0) {
    if (item.value.selectedCommunitys.length === 0) {
      communityErrorMessage.value = t("errors.item.choose_community");
    }
    return false;
  }
  return true;
}

async function saveClicked() {
  if (!checkValidation()) return;

  if (imageToSend.value) {
    item.value.image = await uploadNewImage(imageToSend.value);
  }
  if (!showDescription.value) item.value.description = "";

  const itemInfo = {
    title: item.value.title,
    description: item.value.description,
    communityIDs: item.value.selectedCommunitys,
    image: item.value.image,
  };

  await postNewItem(itemInfo);

  await communityStore.fetchCommunityItems();
  await communityStore.fetchMyItems();
  emits("closesModal");
  notifications.notify({ type: "success", text: t("notification.shared") });
}

async function addImage(event) {
  const image = event.target.files[0];

  new Compressor(image, {
    quality: 0.7,
    maxWidth: 500,
    maxHeight: 500,
    convertTypes: ["image/png", "image/webp"],
    convertSize: 100000,
    resize: "cover",
    success(result) {
      const resFile = new File([result], { type: result.type });
      const fileReader = new FileReader();

      fileReader.onloadend = async () => {
        imageToSend.value = fileReader.result;
        imageToShow.value = URL.createObjectURL(resFile);
      };
      fileReader.readAsArrayBuffer(resFile);
    },
    error() {},
  });
  event.target.value = null;
}

function onChangeCommunity(e) {
  const selectedCommunityID = e.target.value;
  const index = item.value.selectedCommunitys.indexOf(selectedCommunityID);

  if (index > -1) {
    item.value.selectedCommunitys.splice(index, 1);
  } else {
    item.value.selectedCommunitys.push(selectedCommunityID);
    communityErrorMessage.value = "";
  }
}

function removeImage() {
  imageToShow.value = null;
  imageToSend.value = null;
}
</script>
