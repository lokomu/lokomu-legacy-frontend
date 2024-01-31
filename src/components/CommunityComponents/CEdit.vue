<template>
  <!-- A form for editing a community -->
  <div class="bg-white dark:bg-gray-900 rounded-3xl w-full p-4">
    <div class="flex flex-col gap-4 w-full xs:w-3/4 mx-auto">
      <!-- Images -->
      <div>
        <input
          ref="file"
          type="file"
          class="hidden"
          multiple
          accept="image/x-png,image/gif,image/jpeg"
          @change="addImage"
        >
      </div>
      <ItemImage
        v-if="showImage"
        class="mx-auto"
        :image="showImage"
        :profile="true"
        @remove="removeImage"
      />
      <ShadowButton
        class="h-14 w-14 mx-auto shadow-xl"
        @click="$refs.file.click()"
      >
        <AddImageIcon class="m-auto h-8 fill-black dark:fill-white" />
      </ShadowButton>

      <!-- Title -->
      <div :class="{ error: v$.community.name.$errors.length }">
        <InputField
          id="title"
          v-model="v$.community.name.$model"
          type="text"
          name="title"
          :placeholder="t('placeholder.name.community')"
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
          id="area"
          v-model="v$.community.place.$model"
          type="text"
          name="area"
          :placeholder="t('placeholder.area')"
          :is-valid="
            v$.community.place.$dirty ? !v$.community.place.$error : null
          "
          @enter="saveClicked"
        />

        <!-- error message for place-->
        <div
          v-for="(error, index) of v$.community.place.$errors"
          :key="index"
          class="text-red-500"
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
          name="description"
          :placeholder="t('placeholder.description')"
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
          class="text-red-500"
        >
          <div class="text-red-500 text-sm">
            {{ error.$message }}
          </div>
        </div>
      </div>
      <!-- Radio boxes -->
      <div class="ml-20 mx-auto">
        <div class="form-check">
          <input
            v-model="community.visibility"
            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-700 checked:border-blue-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            value="1"
            @change="checkRadioButton(1)"
          >
          <label
            class="form-check-label font-semibold inline-block text-black dark:text-white"
          >
            {{ t("menu.community.new.private") }}
          </label>
        </div>
        <div class="form-check">
          <input
            v-model="community.visibility"
            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-700 checked:border-blue-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            value="2"
            @change="checkRadioButton(2)"
          >
          <label
            class="form-check-label font-semibold inline-block text-black dark:text-white"
          >
            {{ t("menu.community.new.open") }}
          </label>
        </div>
        <div class="form-check">
          <input
            v-model="community.visibility"
            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-700 checked:border-blue-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            value="0"
            @change="checkRadioButton(0)"
          >
          <label
            class="form-check-label font-semibold inline-block text-black dark:text-white"
          >
            Skjult
          </label>
        </div>
      </div>
      <!-- Save item button -->
      <ColorButton
        class="mx-auto"
        :text="t('button.save')"
        @click="saveClicked"
      />
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { onMounted, ref } from "vue";
import { helpers, maxLength, required } from "@vuelidate/validators";
import { getCommunity, putCommunity } from "@/api/factories/CommunityFactory";
import { uploadNewImage } from "@/api/factories/ImageFactory";
import AddImageIcon from "@/components/IconComponents/AddImageIcon";
import ColorButton from "@/components/BaseComponents/ColorButton";
import Compressor from "compressorjs";
import ItemImage from "@/components/ItemComponents/ItemImage.vue";
import { useCommunityStore } from "@/stores/CommunityStore";
import ShadowButton from "@/components/BaseComponents/ShadowButton";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import InputField from "@/components/BaseComponents/InputField";
import TextAreaField from "@/components/BaseComponents/TextAreaField";

const communityStore = useCommunityStore();
const notifications = useNotification();
const { t } = useI18n();
const router = useRouter();

const community = ref({
  name: "",
  description: "",
  radio: null,
  place: "",
  visibility: null,
  image: null,
});

const initialCommunity = ref(null);
const showImage = ref("");
const imageToSend = ref(null);
const imageChange = ref(false);

const emits = defineEmits(["closesModal"]);

const rules = {
  community: {
    name: {
      required: helpers.withMessage(
        () => t("errors.community.name_empty"),
        required,
      ),
      max: helpers.withMessage(
        () => t("errors.community.name_max"),
        maxLength(50),
      ),
    },
    place: {
      required: helpers.withMessage(
        () => t("errors.community.place_empty"),
        required,
      ),
      max: helpers.withMessage(
        () => t("errors.community.place_max"),
        maxLength(50),
      ),
    },
    description: {
      required: helpers.withMessage(
        () => t("errors.community.description_empty"),
        required,
      ),
      max: helpers.withMessage(
        () => t("errors.description_max"),
        maxLength(200),
      ),
    },
  },
};

const v$ = useVuelidate(rules, { community });

const checkRadioButton = (number) => {
  community.value.visibility = number;
};

async function saveClicked() {
  if (!(await v$.value.$validate())) return;

  if (imageChange.value) {
    community.value.image = await uploadNewImage(imageToSend.value);
  }

  const communityInfo = {
    name: community.value.name,
    description: community.value.description,
    visibility: community.value.visibility,
    location: community.value.place,
    image: community.value.image,
  };

  try {
    const response = await putCommunity(
      communityInfo,
      communityStore.community.ID,
    );
    await communityStore.getCommunity(response);
    await communityStore.fetchMyCommunities();
    emits("closesModal");
    await router.push("/c");
    notifications.notify({
      type: "success",
      text: t("notification.community.updated"),
    });
  } catch (error) {
    notifications.notify({ type: "error", text: t("errors.error") });
  }
}

const addImage = async (event) => {
  const that = { imageToSend, showImage }; // To reference in the Compressor success callback
  let image = event.target.files[0];

  new Compressor(image, {
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
        that.imageToSend.value = fileReader.result;
        that.showImage.value = URL.createObjectURL(resFile);
      };
      imageChange.value = true;
    },
    error() {},
  });
  event.target.value = null;
};

const removeImage = () => {
  imageToSend.value = null;
  showImage.value = "";
  community.value.image = null;
};

onMounted(async () => {
  initialCommunity.value = await getCommunity(communityStore.community.ID);
  community.value = initialCommunity.value;
  if (community.value.image != null) {
    showImage.value =
      import.meta.env.VITE_BASEURL + "image/" + community.value.image;
  }
  community.value.place = initialCommunity.value.location;
  checkRadioButton(initialCommunity.value.visibility);
});
</script>
