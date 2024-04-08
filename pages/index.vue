<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Калькулятор зарплаты',
  meta: [
    { name: 'description', content: 'Калькулятор зарплаты онлайн' },
  ],
});

const router = useRouter();

router.replace({ path: '/kalkulator-zarplati' });
</script>

<template>
  <div class="flex justify-center">
<!--    <div class="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-indigo-600" />-->
  </div>
</template>
