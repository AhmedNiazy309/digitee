export default {
    baseUrl:
      process.env.NODE_ENV === "production"
        ? "http://vue.aait-sa.com:3000" // Production base URL
        : "http://localhost:3000", // Development base URL
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    defaultLocale: "ar",
    defaultDirection: "rtl",
    langDir: "locales",
    strategy: "prefix_except_default", // URL strategy
    locales: [
      {
        code: "en",
        name: "English",
        dir: "ltr",
        file: { path: "en.json", cache: false },
        language: "en",
      },
      {
        code: "ar",
        name: "عربي",
        dir: "rtl",
        file: { path: "ar.json", cache: false },
        language: "ar",
      },
    ],
  }
  