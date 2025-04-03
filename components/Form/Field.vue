<template>
  <div>
    <label v-if="label" class="d-block mb-2">{{ label }}</label>

    <IconField>
      <slot v-if="iconStart" name="iconStart"></slot>
      <InputText
        v-if="type == 'text'"
        v-model="model[name]"
        :placeholder="placeholder"
        fluid
      />

      <InputNumber
        v-if="type == 'number'"
        v-model="model[name]"
        :placeholder="placeholder"
        :useGrouping="useGrouping"
        fluid
      />

      <Textarea
        v-if="type == 'textarea'"
        v-model="model[name]"
        :placeholder="placeholder"
        fluid
      />

      <Password
        v-if="type == 'password'"
        v-model="model[name]"
        :placeholder="placeholder"
        :feedback="feedbackPassword"
        fluid
      />
      <slot v-if="iconEnd" name="iconEnd"></slot>
    </IconField>
  </div>
</template>

<script setup>
const props = defineProps({
  model: {
    type: [Array, Object],
  },
  useGrouping: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    default: "",
  },
  parentClass: {
    type: String,
  },
  iconEnd: {
    type: Boolean,
    default: false,
  },
  iconStart: {
    type: Boolean,
    default: false,
  },
  feedbackPassword: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
