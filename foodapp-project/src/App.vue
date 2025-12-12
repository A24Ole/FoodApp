<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="app-wrapper d-flex flex-column min-vh-100 w-100">
    <TheNavbar />

    <div class="container-fluid flex-grow-1 px-0">
      <RouterView />
    </div>

    <TheFooter />
  </div>
</template>

<style>
/* Global overrides if needed, otherwise let Bootstrap handle it */
body {
  background-color: #f8f9fa;
}
</style>
