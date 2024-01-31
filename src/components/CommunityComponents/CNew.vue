<template>
  <!-- A form for creating a new community -->
  <div
    class="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden m-auto w-full p-4"
  >
    <div class="flex flex-col gap-4 w-full xs:w-3/4 mx-auto">
      <div
        v-if="imageToShow"
        class="flex justify-center"
      >
        <div class="h-24 w-24 rounded-full overflow-hidden">
          <ItemImage
            v-if="imageToShow"
            :image="imageToShow"
            :profile="true"
            class="object-contain"
            @remove="removeImage"
          />
        </div>
      </div>
      <div
        v-if="!imageToShow"
        class="flex justify-center"
      >
        <input
          ref="file"
          type="file"
          class="hidden"
          multiple
          accept="image/x-png,image/gif,image/jpeg"
          @change="addImage"
        >
        <ShadowButton
          class="h-14 w-14 mx-auto shadow-xl"
          @click="$refs.file.click()"
        >
          <AddImageIcon class="m-auto h-8 fill-black dark:fill-white" />
        </ShadowButton>
      </div>
      <!-- Title -->
      <div :class="{ error: v$.community.name.$errors.length }">
        <InputField
          id="title"
          v-model="v$.community.name.$model"
          type="text"
          name="title"
          :placeholder="$t('placeholder.name.community')"
          :is-valid="
            v$.community.name.$dirty ? !v$.community.name.$error : null
          "
          @enter="saveClicked()"
        />

        <!-- error message for title-->
        <div
          v-for="(error, index) of v$.community.name.$errors"
          :key="index"
          class="text-red-500 text-center"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Place -->
      <div :class="{ error: v$.community.place.$errors.length }">
        <InputField
          id="location"
          v-model="v$.community.place.$model"
          type="text"
          name="location"
          :placeholder="$t('placeholder.area')"
          :is-valid="
            v$.community.place.$dirty ? !v$.community.place.$error : null
          "
          @enter="saveClicked()"
        />

        <!-- error message for place-->
        <div
          v-for="(error, index) of v$.community.place.$errors"
          :key="index"
          class="text-red-500 text-center"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>

      <!-- Description -->
      <div :class="{ error: v$.community.description.$errors.length }">
        <TextAreaField
          id="description"
          v-model="v$.community.description.$model"
          :placeholder="$t('placeholder.description')"
          name="description"
          :rows="2"
          :is-valid="
            v$.community.description.$dirty
              ? !v$.community.description.$error
              : null
          "
        />

        <!-- error message for description -->
        <div
          v-for="(error, index) of v$.community.description.$errors"
          :key="index"
          class="text-red-500 text-center"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <!-- Radio boxes -->
      <div class="space-y-2">
        <div class="flex justify-center mr-5">
          <label class="flex items-center cursor-pointer">
            <input
              class="rounded-full h-4 w-4 border-2 border-gray-300 bg-white checked:bg-green-700 checked:border-green-700 focus:ring-0 focus:outline-none cursor-pointer"
              type="radio"
              name="flexRadioDefault"
              checked
              @change="checkRadioButton(1)"
            >
            <span class="ml-2 font-medium text-sm text-black dark:text-white">
              {{ $t("menu.community.new.private") }}
            </span>
          </label>
        </div>
        <div class="flex justify-center mr-5">
          <label class="flex items-center cursor-pointer">
            <input
              class="rounded-full h-4 w-4 border-2 border-gray-300 bg-white checked:bg-green-700 checked:border-green-700 focus:ring-0 focus:outline-none cursor-pointer"
              type="radio"
              name="flexRadioDefault"
              @change="checkRadioButton(2)"
            >
            <span class="ml-2 font-medium text-sm text-black dark:text-white">
              {{ $t("menu.community.new.open") }}
            </span>
          </label>
        </div>
        <div class="flex justify-center mr-5">
          <label class="flex items-center cursor-pointer">
            <input
              class="rounded-full h-4 w-4 border-2 border-gray-300 bg-white checked:bg-green-700 checked:border-green-700 focus:ring-0 focus:outline-none cursor-pointer"
              type="radio"
              name="flexRadioDefault"
              @change="checkRadioButton(0)"
            >
            <span class="ml-2 font-medium text-sm text-black dark:text-white">
              {{ $t("menu.community.new.hidden") }}
            </span>
          </label>
        </div>
      </div>
      <!-- Save item button -->
      <ColorButton
        class="mx-auto"
        :text="$t('button.community.create')"
        button-color="blue"
        @click="saveClicked()"
      />
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { helpers, maxLength, required } from "@vuelidate/validators";
import { postNewCommunity } from "@/api/factories/CommunityFactory";
import { uploadNewImage } from "@/api/factories/ImageFactory";
import { useUserStore } from "@/stores/UserStore";
import ColorButton from "@/components/BaseComponents/ColorButton";
import AddImageIcon from "@/components/IconComponents/AddImageIcon";
import Compressor from "compressorjs";
import ItemImage from "@/components/ItemComponents/ItemImage.vue";
import { useCommunityStore } from "@/stores/CommunityStore";
import ShadowButton from "@/components/BaseComponents/ShadowButton";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useNotification } from "@kyvg/vue3-notification";
import InputField from "@/components/BaseComponents/InputField";
import TextAreaField from "@/components/BaseComponents/TextAreaField";

const emits = defineEmits(["closesModal"]);
const userStore = useUserStore();
const communityStore = useCommunityStore();
const router = useRouter();
const { t } = useI18n();
const notifications = useNotification();

const community = ref({
  name: "",
  description: "",
  radio: null,
  place: "",
  visibility: 1,
  image: null,
});

const imageToShow = ref("");
const imageToSend = ref(null);

const checkRadioButton = (number) => {
  community.value.visibility = number;
};

const checkValidation = () => {
  v$.value.community.$touch();
  return !v$.value.community.$invalid;
};

async function saveClicked() {
  if (imageToSend.value) {
    community.value.image = await uploadNewImage(imageToSend.value);
  }
  if (checkValidation()) {
    const communityInfo = {
      name: community.value.name,
      description: community.value.description,
      visibility: community.value.visibility,
      location: community.value.place,
      image: community.value.image,
    };
    const response = await postNewCommunity(communityInfo);
    userStore.addAdmin(response);
    await communityStore.getCommunity(response);
    communityStore.member = true;
    await communityStore.fetchMyCommunities();
    await router.push("/c");
    emits("closesModal");
    notifications.notify({
      type: "success",
      title: t("notification.community.created"),
    });
  }
}

async function addImage(event) {
  const file = event.target.files[0];

  new Compressor(file, {
    quality: 0.8,
    width: 200,
    height: 200,
    maxHeight: 200,
    maxWidth: 200,
    convertTypes: ["image/png", "image/webp"],
    convertSize: 10000,
    resize: "cover",

    success(result) {
      const resFile = new File([result], {
        type: result.type,
      });
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(resFile);
      fileReader.onloadend = async function () {
        imageToSend.value = fileReader.result;
        imageToShow.value = URL.createObjectURL(resFile);
      };
    },
    error() {},
  });
  event.target.value = null;
}

function removeImage() {
  imageToSend.value = null;
  imageToShow.value = "";
}

const rules = {
  community: {
    name: {
      required: helpers.withMessage(
        () => t("errors.community.name_empty"),
        required,
      ),
      max: helpers.withMessage(
        () => t("errors.community.name_max"),
        maxLength(23),
      ),
    },
    place: {
      required: helpers.withMessage(
        () => t("errors.community.place_empty"),
        required,
      ),
      max: helpers.withMessage(
        () => t("errors.community.place_max"),
        maxLength(20),
      ),
    },
    description: {
      required: helpers.withMessage(
        () => t("errors.community.description_empty"),
        required,
      ),
      max: helpers.withMessage(
        () => t("errors.description_max"),
        maxLength(100),
      ),
    },
  },
};
const v$ = useVuelidate(rules, { community });
</script>
