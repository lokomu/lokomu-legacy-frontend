<template>
  <div class="w-full bg-white dark:bg-gray-900 rounded-3xl p-4">
    <div class="flex flex-col gap-4 w-full xs:w-3/4 mx-auto">
      <ItemImage
        v-if="imageToShow"
        class="mx-auto"
        :profile="true"
        :image="imageToShow"
        @remove="removeImage"
      />
      <ProfileIcon
        v-else
        class="h-24 fill-green-500"
      />
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

      <div class="flex justify-between">
        <div>
          <!-- First name -->
          <InputField
            id="firstName"
            v-model="firstName"
            type="text"
            name="firstName"
            :placeholder="$t('placeholder.name.first')"
            :is-valid="v$.firstName.$dirty ? !v$.firstName.$error : null"
            @enter="saveClicked()"
          />

          <!-- error message for first name-->
          <div
            v-for="(error, index) of v$.firstName.$errors"
            :key="index"
            class="text-red-500 text-sm text-center"
          >
            <div
              v-show="showError"
              id="firstNameErrorID"
              class="text-red-500 text-sm"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>

        <div class="ml-2">
          <!-- Last name -->
          <InputField
            id="lastName"
            v-model="lastName"
            type="text"
            name="lastName"
            :placeholder="$t('placeholder.name.last')"
            :is-valid="v$.lastName.$dirty ? !v$.lastName.$error : null"
            @enter="saveClicked()"
          />
          <!-- error message for last name -->
          <div
            v-for="(error, index) of v$.lastName.$errors"
            :key="index"
            class="text-red-500 text-sm text-center"
          >
            <div
              v-show="showError"
              id="lastNameErrorID"
              class="text-red-500 text-sm"
            >
              {{ error.$message }}
            </div>
          </div>
        </div>
      </div>
      <ColorButton
        class="mx-auto"
        :text="$t('button.save')"
        @click="saveClicked()"
      />
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { editUser, getCurrentUser } from "@/api/factories/UserFactory";
import { uploadNewImage } from "@/api/factories/ImageFactory";
import AddImageIcon from "@/components/IconComponents/AddImageIcon";
import ColorButton from "@/components/BaseComponents/ColorButton";
import ProfileIcon from "@/components/IconComponents/ProfileIcon";
import Compressor from "compressorjs";
import ItemImage from "@/components/ItemComponents/ItemImage.vue";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, ref } from "vue";
import ShadowButton from "@/components/BaseComponents/ShadowButton";
import InputField from "@/components/BaseComponents/InputField";

const userStore = useUserStore();

const emits = defineEmits(["closesModal"]);

const showError = ref(false);
const firstName = ref("");
const lastName = ref("");
const image = ref(null);
const imageToShow = ref(null);
const imageToSend = ref(null);

const rules = {
  firstName: {
    required: helpers.withMessage("errors.empty_field", required),
  },
  lastName: {
    required: helpers.withMessage("errors.empty_field", required),
  },
};

const v$ = useVuelidate(rules, { firstName, lastName });

async function saveClicked() {
  showError.value = true;

  if (!(await v$.value.$validate())) return;

  if (imageToSend.value) {
    image.value = await uploadNewImage(imageToSend.value);
  }

  const userInfo = {
    firstName: firstName.value,
    lastName: lastName.value,
    image: image.value,
  };

  await editUser(userInfo);
  const newUserInfo = await getCurrentUser(userStore.currentUser.ID);
  userStore.setCurrentUser(newUserInfo);
  emits("closesModal");
}

function addImage(event) {
  let file = event.target.files[0];

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
}

function removeImage() {
  imageToSend.value = null;
  imageToShow.value = "";
  image.value = null;
}

onMounted(async () => {
  let user = await getCurrentUser(userStore.currentUser.ID);
  firstName.value = user.firstName;
  lastName.value = user.lastName;
  if (user.image) {
    image.value = user.image;
    imageToShow.value = import.meta.env.VITE_BASEURL + "image/" + image.value;
  } else {
    imageToShow.value = null;
  }
});
</script>
