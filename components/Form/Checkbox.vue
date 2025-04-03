<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="form-check mb-2">
    <input
      :id="inputId"
      :value="option"
      v-model="model[name]"
      class="form-check-input"
      type="checkbox"
    />
    <label class="form-check-label fw-bold" :for="inputId">
      {{ label }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  inputId: {
    required: true,
    type: String,
  },
  label: {
    required: true,
    type: String,
  },
  model: {
    type: [Object, Array],
  },
  name: {
    type: String,
    default: "",
  },
  option: {
    type: String,
    default: "",
  },
});
</script>
