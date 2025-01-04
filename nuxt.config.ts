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
    public: {
      apiTrackingBaseUrl: process.env.NUXT_PUBLIC_API_TRACKING_BASE_URL || ''
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/fundations/variables";
            @import "@/assets/scss/fundations/functions";
            @import "@/assets/scss/fundations/mixins";
            @import "@/assets/scss/fundations/fonts";
          `,
        },
      },
    },
  },
});
