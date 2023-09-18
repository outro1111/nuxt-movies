// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/css/style.css'],
  runtimeConfig: {
    public: {
      apiURL: process.env.API_BASE_URL,
      // apiURL: 'http://localhost:1337',
    },
  },
  // ssr: true,
  // modules: ['@nuxtjs/strapi'],
  // strapi: {
  //   url: 'http://localhost:1337'
  // },
})
