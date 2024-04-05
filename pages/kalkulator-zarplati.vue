<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Калькулятор зарплаты',
  meta: [
    { name: 'description', content: 'Калькулятор зарплаты онлайн' }
  ],
})
</script>

<template>
  <calculate />
</template>
