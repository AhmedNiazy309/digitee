<template>
  <div class="uploader-container">
    <div class="file-upload">
      <input
        :data-name="DataName"
        :class="InputClass"
        id="file-upload"
        class="uploadImg"
        :name="name"
        hidden
        type="file"
        accept="image/*"
        @change="fileUploder"
      />
      <label
        v-if="!readonly"
        for="file-upload"
        class="txt_start flex align-items-center mainDark"
        @click="unAnimate"
      >
        <div
          class="bg-primary text-white fs-10px p-2 rounded-circle wh-25 flex-center"
        >
          <span class="pi pi-pen-to-square"></span>
        </div>
      </label>
      <div class="feedback"></div>
    </div>
    <div class="holder-area">
      <img
        v-if="imageSrc"
        :class="{ scaleIn: isAnimated }"
        :src="imageSrc"
        alt=""
      />
      <template v-else>
        <img
          v-if="image"
          :class="{ scaleIn: isAnimated }"
          :src="image"
          alt="profile"
        />
        <img
          v-else
          :class="{ scaleIn: isAnimated }"
          src=""
          alt="profile"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  name: {
    type: String,
  },
  InputClass: {
    type: String,
  },
  DataName: {
    type: String,
  },
  image: {
    type: String,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});
const imageSrc = ref(``);
const isAnimated = ref(false);
const unAnimate = () => {
  isAnimated.value = false;
};
const fileUploder = (e) => {
  let selectedFiles = e.target.files[0];
  let read = new FileReader();
  read.readAsDataURL(selectedFiles);
  read.onload = (e) => {
    imageSrc.value = e.target.result;
    isAnimated.value = true;
  };
};
</script>

<style lang="scss" scoped>
.uploader-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: auto;

  .file-upload {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #229edb;
    display: flex;
    align-items: flex-end;

    label {
      cursor: pointer;
      position: absolute;
      z-index: 2;
      left: 0;
    }
    .feedback {
      z-index: 10;
      width: fit-content;
      height: fit-content;
      bottom: -45%;
    }
  }

  .holder-area {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    button {
      position: absolute;
      top: -1px;
      left: -5px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      padding: 0;
      background-color: crimson;
      color: #fff;
    }
  }
}

html[lang="en"] {
  .uploader-container {
    .file-upload {
      label {
        right: 0;
        left: auto;
      }
    }
  }
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
</style>
