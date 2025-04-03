<template>
  <DatePicker
    v-model="model[name]"
    @update:modelValue="$emit('dateChange')"
    showIcon
    iconDisplay="input"
    dateFormat="dd-mm-yy"
    :placeholder="placeholder"
  />
</template>
<script setup>
import DatePicker from "primevue/datepicker";
const props = defineProps({
  model: {
    type: [Array, Object],
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>
