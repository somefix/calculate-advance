<template>
  <div class="pt-36 pb-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-5 text-gray-400 flex flex-col items-center justify-center">
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-if="error.statusCode === 409">Не поддерживается на устройствах с маленьким размером экрана.</h1>
    <h1 v-else>An error occurred - {{ error.statusCode }} </h1>
    <NuxtLink to="/">Вернуться на главную страницу</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>