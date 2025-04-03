<template>
  <div :class="parentClass">
    <label v-if="label" class="d-block mb-2">{{ label }}</label>
    <div class="form-inputs">
      <MultiSelect
        v-if="multi"
        v-model="model[name]"
        @change="$emit('selectChange')"
        :options="options"
        optionLabel="name"
        :selectionLimit="selectionLimit"
        :placeholder="placeholder"
        :display="display"
        class="w-full"
        :disabled="disabled"
      >
        <template v-if="customTemp" #option="slotProps">
          <div class="flex align-items-center">
            <img
              :alt="slotProps.option.name"
              :src="slotProps.option.image"
              width="20"
              height="20"
              class="rounded-circle me-2 border border-primary"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </MultiSelect>

      <Select
        v-else
        @change="$emit('selectChange')"
        v-model="model[name]"
        :options="options"
        :optionLabel="optionLabel"
        :placeholder="placeholder"
        class="w-full"
        :disabled="disabled"
      />
      <span v-if="$slots.icon" class="form-icon">
        <slot name="icon"></slot>
      </span>
      <div v-if="addition" class="addition">
        <slot name="addition"></slot>
      </div>
      <!-- <div class="feedback"></div> -->
    </div>
  </div>
</template>

<script setup>
import Select from "primevue/select";
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  selectionLimit: {
    type: Number,
  },
  optionLabel: {
    type: String,
    default: "name",
  },
  display: {
    type: String,
    default: "comma",
  },
  placeholder: {
    type: String,
    default: "اختر",
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  addition: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  parentClass: {
    type: String,
  },
  icon: {
    type: Boolean,
    default: false,
  },
  model: {
    type: [Array, Object],
  },
  multi: {
    type: Boolean,
    default: false,
  },
  customTemp: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.p-select,
.p-multiselect {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 2px solid #ddd !important;
  background-color: #fff;
  color: #000;
  transition: 0.3s all ease;
  border-radius: 5px;
  font-size: 13px;
  // padding-inline-start: 35px;

  &.p-focus {
    box-shadow: none;
    border-color: #2966b0 !important;
  }

  &.p-overlay-open {
    box-shadow: none;
  }

  .p-select-label,
  .p-multiselect-label {
    padding: 0;
    font-size: 13px;
    font-family: "URW DIN Arabic" !important;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &.code {
    padding-inline-start: 10px;
    width: 80px;
    border: 0;
    &::after {
      position: absolute;
      right: 0;
      content: "";
      background-color: #ddd;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 1px;
      height: 70%;
    }

    .p-select-trigger {
      width: 1rem !important;
      margin-inline-end: 6px;
    }

    .p-select-label {
      overflow: visible;
    }

    .p-icon {
      width: 10px !important;
      height: 10px !important;
    }
  }
}

.addition {
  position: absolute;
  left: 0;
  height: 100%;
}

.p-select-option-selected{
  background-color: #2966b038 !important;
  color: #2966b0 !important;
}

html[lang="en"] {
  .addition {
    left: unset;
    right: 0;
  }
}
html[lang="ar"] {
  .p-checkbox {
    &.p-component {
      margin-right: 0;
      margin-left: 0.5rem;
    }
  }

  .p-multiselect-chip {
    .p-multiselect-token {
      margin-right: 0;
      margin-left: 0.5rem;
      .p-multiselect-token-icon {
        margin-left: 0;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
