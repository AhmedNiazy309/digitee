<template>
  <div :class="parentClass" class="position-relative">
    <label class="d-block mb-2">{{ label }}</label>
    <div class="form-inputs" :class="{
      unIconed: !icon,
      iconLeft: iconLeft == true,
      iconRight: iconRight == true,
    }">
      <div class="file-placeholder default_input p-0">
        <input :name="name" :disabled="readonly" :id="id" type="file" class="file-upload" accept="image/*"
          ref="fileUploadRef" :class="InputClass" />
        <div class="file-browse">
          <span class="file-browse-txt">{{ model[name] ? model[name] : placeholder }}
          </span>
          <span v-if="browseIcon" class="browse">
            <i class="fa-solid fa-paperclip text-primary"></i>
          </span>
          <span v-else class="browse"> <i class="fa-solid fa-upload"></i></span>
        </div>
      </div>
      <span v-if="$slots.icon" class="form-icon">
        <slot name="icon"></slot>
      </span>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";
const emit = defineEmits(["update:fileUrl"]);

const props = defineProps({
  InputClass: {
    type: String,
  },
  parentClass: {
    type: String,
  },
  label: {
    type: String,
  },
  model: {
    type: [Array, Object],
  },
  placeholder: {
    type: String,
  },

  name: {
    type: String,
  },
  id: {
    type: String,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  browseIcon: {
    type: Boolean,
    default: false,
  },
});

const fileUploadRef = ref(null);

onMounted(() => {
  if (fileUploadRef.value) {
    fileUploadRef.value.addEventListener("change", getFileName);
  }
});

const getFileName = (e) => {
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    const customFile = URL.createObjectURL(file);
    reader.onloadend = (e) => {
      const base64String = reader.result;
      emit("update:fileUrl", file); // Emitting the event with the file URL
      emit("update:fileUrlBase", base64String); // Emitting the event with the file URL
    };
    reader.readAsDataURL(file); // Read file as data URL
  }

  const newVal = fileUploadRef.value.value;
  if (newVal !== "") {
    fileUploadRef.value.nextElementSibling.querySelector(
      ".file-browse-txt"
    ).textContent = newVal;
  }
};
</script>

<style lang="scss">
.file-placeholder {
  position: relative;
  cursor: pointer;

  label {
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  input[type="file"] {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .file-browse {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.375rem 0.75rem;
    padding-inline-start: 35px;

    .file-browse-txt {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
      padding-inline-end: 10px;
      color: #656565;
      font-size: 12px;
    }

    .browse {
      display: block;
      font-size: 14px;
    }
  }
}

.form-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  pointer-events: none;
  color: #2966b0;

  &.option {
    left: 0;
    right: unset;
    width: unset;
    pointer-events: visible;
  }
}

.form-inputs {
  &.unIconed {
    .file-browse {
      padding-inline-start: 10px;
    }
  }
}

html[lang="en"] {
  .form-icon {
    &.option {
      right: 0;
      left: unset;
      width: unset;
    }
  }
}
</style>
