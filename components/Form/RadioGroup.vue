<template>
  <FormRadio
    v-for="(option, index) in options"
    :option="option.id ? option.id : option.name"
    :label="option.text ? option.text : option.label"
    :key="option"
    :model="model"
    :name="name"
    :class="index !== 0 && !isColumn && 'ms-md-5'"
    :disabled="disabled"
  />
</template>

<script setup>
const props = defineProps({
  options: {
    required: true,
    type: Array,
  },
  name: {
    required: true,
    type: String,
    default: "",
  },
  isColumn: {
    type: Boolean,
    default: false,
  },
  model: {
    type: [Array, Object],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
