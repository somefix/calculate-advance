<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-sky-50">
<!--    <Navigation />-->

    <transition name="home">
      <div class="container min-h-screen px-5 py-10">
        <slot />
      </div>
    </transition>
    <Footer/>
  </div>
</template>
