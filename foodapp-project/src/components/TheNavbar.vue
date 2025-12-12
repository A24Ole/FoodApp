<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container-fluid px-4">
      <RouterLink class="navbar-brand text-success fw-bold fs-3" to="/"> 🍲 FoodApp </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link fw-semibold px-4" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fw-semibold px-4" to="/search">Search</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link fw-semibold px-4" to="/favourites">Favourites</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
