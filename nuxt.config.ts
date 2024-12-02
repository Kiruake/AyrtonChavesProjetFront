// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],

css: ['@/assets/scss/main.scss'],

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