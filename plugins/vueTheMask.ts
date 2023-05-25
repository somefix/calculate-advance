import { mask } from 'vue-the-mask'

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  nuxtApp.vueApp.directive('mask', mask);
});
