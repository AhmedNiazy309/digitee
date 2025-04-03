<template>
  <nav>
    <div class="flex items-center justify-center mb-4">
      <NuxtLink :to="localeRoute({ name: 'index' })" class="mx-3">{{ $t("home") }} </NuxtLink>
      <NuxtLink :to="localeRoute({ name: 'terms' })" class="mx-3">{{ $t("terms") }} </NuxtLink>
      <NuxtLink :to="localeRoute({ name: 'form' })" class="mx-3">{{ $t("form") }} </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const localeRoute = useLocaleRoute();
</script>

<style lang="scss" scoped></style>
