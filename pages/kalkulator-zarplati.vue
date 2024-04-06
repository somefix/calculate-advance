<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Калькулятор зарплаты',
  meta: [
    { name: 'description', content: 'Калькулятор зарплаты онлайн' },
    { name: 'yandex-verification', content: 'b15fe8bd630f2147' }
  ],
})
</script>

<template>
  <calculate />
</template>
