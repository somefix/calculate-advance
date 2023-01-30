<template>
  <div class="min-h-screen bg-sky-50">
    <div class="container min-h-screen px-5 py-10">
      <transition name="home">
        <Nuxt/>
      </transition>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>
.home-enter-active, .home-leave-active { transition: opacity .5s; }
.home-enter, .home-leave-active { opacity: 0; }
</style>
