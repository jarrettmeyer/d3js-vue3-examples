/**
 * @see https://nuxt.com/docs/api/configuration/nuxt-config
 */
const config = defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        "data-bs-theme": "dark",
        lang: "en",
      },
      link: [],
      script: [],
    },
  },
  css: ["assets/styles/main.scss"],
  plugins: [],
});

export default config;
