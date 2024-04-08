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
      title: 'Paymeter',
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Калькулятор зарплаты онлайн' },
        { name: 'yandex-verification', content: 'b15fe8bd630f2147' },
        { name: 'google-site-verification', content: 'Of788WZrSTo_nmyDC4xMa1TgoZ1LGkbzpvyz9fayLJQ' },
      ],
    },
    baseURL: process.env?.BASE_URL ?? '/',
  },
  plugins: [
    '~/plugins/money3.ts'
  ],
  modules: [
    '@artmizu/yandex-metrika-nuxt',
    'nuxt-gtag'
  ],
  yandexMetrika: {
    // @ts-ignore
    id: process.env.YANDEX_METRIKA_ID,
    initParams: {
      webvisor:true,
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
    },
  },
  gtag: {
    id: process.env.GOOGLE_TAG_ID
  }
})
