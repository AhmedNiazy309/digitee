<template>
  <div class="container">
    <a
      href="#"
      v-for="locale in availableLocales"
      :key="locale.code"
      @click.prevent.stop="setLocale(locale.code)"
    >
      <i class="pi pi-globe"></i>
      {{ locale.name }}
    </a>
  </div>
</template>

<script setup>
// i18n
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<style lang="scss" scoped></style>
