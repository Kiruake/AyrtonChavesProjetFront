// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', "@nuxtjs/sanity"],

css: ['@/assets/scss/main.scss'],

components: [
  {
    path: '~/components',
    pathPrefix: false,
  },
],

sanity: {
  projectId: "egvikvdk",
  dataset: "production",
},

runtimeConfig: {
  public : {
    apiTrackingBaseUrl: process.env.NUXT_PUBLIC_API_TRACKING_BASE_URL || ''
  }
},

vite: {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/fundations/variables" as *;
          @use "@/assets/scss/fundations/functions" as *;
          @use "@/assets/scss/fundations/mixins" as *;
          @use "@/assets/scss/fundations/fonts" as *;
        `,
      },
    },
  },
},
  
})