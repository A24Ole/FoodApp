<script setup>
// Components are auto-imported in Nuxt, but we can also be explicit if needed.
// For migration, we rely on auto-imports for components in `components/`.
</script>

<template>
  <div class="app-wrapper d-flex flex-column min-vh-100 w-100">
    <TheNavbar />
    <div class="container-fluid flex-grow-1 px-0">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<style>
/* Global overrides if needed, copied from App.vue */
body {
  background-color: #f8f9fa;
}
</style>
