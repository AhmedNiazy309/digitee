<template>
  <Transition name="slide-up">
    <div class="upload_wrapper" v-if="show_uploader_box">
      <label class="uploder-chat" @click="unAnimate">
        <div class="flex flex-column align-items-center">
          <img
            class="width50"
            :src="require('@/assets/images/cloud.png')"
            alt=""
          />
          <span>{{ $t("layout.insert_file") }}</span>
        </div>
        <input @change="fileUploder" type="file" hidden />
        <div class="chat-holder" v-if="file_src">
          <img :class="{ scaleIn: isAnimated }" :src="file_src" alt="" />
        </div>
      </label>
      <button @click="close_modal" class="btn close-uploder">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </Transition>
</template>

<script setup>
//  ========================= fileUploder
const unAnimate = () => {
  isAnimated.value = false;
};
const fileUploder = (e) => {
  let selectedFiles = e.target.files[0];
  let read = new FileReader();
  read.readAsDataURL(selectedFiles);
  read.onload = (e) => {
    file_src.value = e.target.result;
    isAnimated.value = true;
  };
};
</script>

<style lang="scss" scoped></style>
