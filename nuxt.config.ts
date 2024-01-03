// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/css/style.css'],
  runtimeConfig: {
    public: {
      apiURL: process.env.API_BASE_URL || 'http://127.0.0.1:1337',
      // apiURL: 'http://localhost:1337',
    },
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-rating'
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'kr',
      }
    }
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // // Product page generated on-demand, revalidates in background
    // '/products/**': { swr: 3600 },
    // // Blog post generated on-demand once until next deploy
    // '/blog/**': { isr: true },
    // // Admin dashboard renders only on client-side
    // '/admin/**': { ssr: false },
    // // Add cors headers on API routes
    // '/api/**': { cors: true },
    // // Redirects legacy urls
    // '/old-page': { redirect: '/new-page' }
  }
})
