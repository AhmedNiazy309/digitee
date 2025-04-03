<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const localeRoute = useLocaleRoute();
</script>

<template>
  <section
    class="flex min-h-screen flex-col items-center justify-center bg-slate-400"
  >
    <h1 class="mb-2 text-9xl font-bold">
      {{ error?.statusCode }}
    </h1>
    <p class="mb-10 text-xl sm:text-3xl">{{ error?.statusMessage }}</p>
    <NuxtLink :to="localeRoute({ name: 'index' })" class="btn">
      Go home
    </NuxtLink>
  </section>
</template>
