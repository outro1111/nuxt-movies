// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/css/style.css'],
  runtimeConfig: {
    public: {
      apiURL: process.env.API_BASE_URL || 'http://127.0.0.1:1337',
      // apiURL: 'http://127.0.0.1:1337',
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    'nuxt-rating'
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'kr',
      }
    }
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  }, 
})
