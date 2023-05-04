/**
 * @see https://nuxt.com/docs/api/configuration/nuxt-config
 */
const config = defineNuxtConfig({
  app: {
    baseURL: "/d3js-vue-examples/",
    head: {
      htmlAttrs: {
        "data-bs-theme": "dark",
        lang: "en",
      },
      link: [],
      script: [],
    },
  },
  css: ["bootstrap/scss/bootstrap.scss", "assets/styles/main.scss"],
  plugins: [],
});

export default config;
