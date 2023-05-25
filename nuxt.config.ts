// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // @ts-ignore
  css: ['~/assets/css/main.css'],
  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },
  app: {
    head: {
      title: 'Рассчитать Аванс',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Рассчитать аванс онлайн' },
      ],
    },
  },
  plugins: [
    '~/plugins/vueTheMask.ts'
  ],
})
