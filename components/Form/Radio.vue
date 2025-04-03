<template>
  <div class="form-check align-items-cenetr flex mb-2">
    <input
      class="form-check-input"
      :class="class"
      type="radio"
      :value="option"
      :id="option"
      v-model="model[name]"
      :name="name"
      :disabled="disabled"
    />
    <label class="form-check-label ms-2" :for="option">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  option: {
    required: true,
    type: String,
  },
  label: {
    required: true,
    type: String,
  },
  model: {
    type: [Array, Object],
  },
  name: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
  parentClass: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
