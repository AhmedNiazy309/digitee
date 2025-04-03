import Aura from "@primevue/themes/aura";
import i18nConfig from './app/config/i18n.config'
import appConfig from './app/config/app.config'

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    preset: "node-server",
  },
  server: {
    port: 3000, // or your desired port
    host: "0.0.0.0",
  },
  runtimeConfig: {
    public: {
      apiBase: "https://backend.moaked.com/api/",
    },
  },
  app: appConfig,
  css: ["primeicons/primeicons.css", "~/assets/style/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    '@vueuse/nuxt',
    "vue3-carousel-nuxt",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: ".dark",
          cssLayer: false,
        },
      },
    },
  },
  i18n: i18nConfig,
  googleFonts: {
    families: {
      Montserrat: true,
    },
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
  },
  image: {
    // To enable image optimization on an external website
  },
  build: {
    transpile: ['gsap'],
  },
});