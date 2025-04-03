<template>
  <!-- component element useable -->
  <!-- <FormMultiUploader name="" jobFunction="file or image or all" srcs="[]" :placeholder="t('')" :label="t('')" /> -->
  <!-- /component element useable -->

  <div class="uploader-container multi">
    <div class="file-upload">
      <label
        :for="name"
        class="txt_start flex align-items-center mainDark"
        @click="unAnimate"
      >
        <input
          :name="name"
          :class="InputClass"
          :id="name"
          class="uploadImg"
          hidden
          multiple
          type="file"
          :accept="checkJobFunction()"
          @change="fileUploader"
        />
        <img
          class="width30"
          src="/icon-green.png"
          alt="edit-icon"
        />
        <span class="text-xs text-primary">{{ placeholder }}</span>
        <div class="feedback"></div>
      </label>
    </div>

    <!-- Add a condition to check if the file is an image -->
    <div class="flex items-center gap-3 flex-wrap">
      <div v-for="(item, index) in fileSrcs" :key="item" class="img-box">
        <button
          @click="deleteEvent(index, item.name)"
          class="remove-box"
          type="button"
        >
          <i class="pi pi-times" style="font-size: 0.5rem"></i>
        </button>
        <!-- Add a condition to check if the file is an image -->
        <a
          v-if="item.type.startsWith('image')"
          data-fancybox="upload-gallery"
          :href="item.src"
        >
          <img :class="{ scaleIn: isAnimated }" :src="item.src" alt="" />
        </a>
        <!-- Add a condition to check if the file is a PDF -->
        <a
          v-if="item.type.startsWith('application')"
          data-fancybox="upload-gallery"
          data-type="pdf"
          :href="item.src"
        >
          <img :class="{ scaleIn: isAnimated }" src="/icon-green.png" alt="" />
          <span class="truncate text-center block text-xs">{{
            item.name
          }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// ====================================================================== imports
import { ref } from "vue";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind('[data-fancybox="upload-gallery"]', {});

// ====================================================================== props
const props = defineProps({
  name: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  id: { type: String, default: "" },
  label: { type: String, default: "" },
  jobFunction: { type: String, default: "all" },
  InputClass: { type: String, default: "" },
  srcs: { type: Array, default: [] },
});
// ====================================================================== data
const isAnimated = ref(false);
const fileSrcs = ref([]);
const inputsFiles = ref({});
// get custom toast
const { t } = useI18n();
const { showToast } = useCustomToast();
// ====================================================================== methods
const checkJobFunction = () =>
  props.jobFunction === "image"
    ? "image/*"
    : props.jobFunction === "file"
    ? "application/pdf"
    : "*";

// ========== Add a new method to remove the animation class
const unAnimate = () => {
  isAnimated.value = false;
};

// ============== Add a new method to handle the file upload
const fileUploader = (event) => {
  // Get the input element
  const input = props.name;
  const newFiles = Array.from(event.target.files);
  const existingFiles = inputsFiles.value[input]
    ? Array.from(inputsFiles.value[input])
    : [];
  const allFiles = new DataTransfer();
  //  Initialize inputsFiles.value[input] as an array if it's not already
  if (!inputsFiles.value[input]) {
    inputsFiles.value[input] = [];
  }
  //  Merge new files and existing files
  newFiles.concat(existingFiles).forEach((file) => allFiles.items.add(file));
  inputsFiles.value[input] = allFiles.files;
  Array.from(inputsFiles.value[input]).forEach((file) => {
    // Check if the file is an image and if it's size is valid
    if (validateImageSize(file)) {
      const src = URL.createObjectURL(file);
      const item = { src, name: file.name, type: file.type };
      if (
        !fileSrcs.value.some((existingItem) => existingItem.name === file.name)
      ) {
        fileSrcs.value.push(item);
      }
    } else {
      // remove file from the list if it exceeds the size limit
      if (
        Array.from(inputsFiles.value[input]).some(
          (item) => item.name === file.name
        )
      ) {
        // Remove the file from the list
        const dataTransfer = new DataTransfer();
        Array.from(inputsFiles.value[input])
          .filter((item) => item.name !== file.name)
          .forEach((file) => dataTransfer.items.add(file));
        inputsFiles.value[input] = dataTransfer.files;
      }

      showToast("error", file.name + t("auth.fileSizeError"));
    }
  });
  // Add the animation class
  isAnimated.value = true;
  // Set the input value
  event.target.files = inputsFiles.value[input];
};

// ================== Add a new method to validate the image size

const validateImageSize = (file) => {
  // Set the maximum size for different file types
  const maxSizeInBytes = file.type.startsWith("application")
    ? 20 * 1024 * 1024
    : file.type.startsWith("image")
    ? 10 * 1024 * 1024
    : 20 * 1024 * 1024;

  return file.size <= maxSizeInBytes;
};

// ================= Add a new method to delete an event

const deleteEvent = (index, itemName) => {
  // Get the input element
  const filesInput = document.getElementsByName(props.name)[0];
  const input = props.name;
  const files = new DataTransfer();

  // Remove the file from the list
  Array.from(filesInput.files).forEach((file) => {
    if (file.name !== itemName) files.items.add(file);
  });

  // Set the input value
  filesInput.files = files.files;
  inputsFiles.value[input] = files.files;

  // Remove the file from the list
  fileSrcs.value.splice(index, 1);

  // Remove the animation class
  document
    .querySelectorAll(".reverse")
    .forEach((el) => el.classList.remove("reverse"));
  event.target.parentElement.classList.add("reverse");
};

onMounted(() => {
  if (props.srcs.length) {
    fileSrcs.value = props.srcs;
    // props.srcs.forEach((file) => {
    //   const item = { src, name: file.name, type: file.type };
    // });
  }
});
</script>

<style scoped lang="scss">
.uploader-container {
  @apply relative;

  .file-upload {
    @apply w-full h-full flex items-center rounded-full border shrink-0;

    label {
      @apply cursor-pointer relative z-10;
    }

    .feedback {
      @apply absolute bottom-[-10px] w-fit h-fit z-10;
    }
  }

  &.multi {
    @apply flex items-start gap-3;

    .file-upload {
      @apply w-[73px] h-[73px] flex items-center rounded-lg border-dashed bg-white;

      label {
        @apply w-[73px] h-[73px] flex flex-col items-center justify-center absolute top-0 right-0;
      }
    }

    .img-box {
      @apply relative w-[73px] h-[73px] rounded-lg transition-all;

      img {
        @apply w-[90%] h-[90%] rounded-lg mt-1;
      }

      .remove-box {
        @apply absolute top-0 right-0 z-10 p-0 w-[15px] h-[15px] rounded-full bg-red-500 text-white flex items-center justify-center;
      }
    }
  }
}

.mergedItem {
  @apply w-full h-full rounded-md;
}

.scaleIn {
  animation: scaleIn 0.6s ease forwards;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.reverse {
  animation: scaleIn 0.6s ease reverse;
}
</style>
