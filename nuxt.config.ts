// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],

vite: {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/fundations/variables" as *;
          @use "@/assets/scss/fundations/functions" as *;
          @use "@/assets/scss/fundations/mixins" as *;
        `,
      },
    },
  },
},
  
})