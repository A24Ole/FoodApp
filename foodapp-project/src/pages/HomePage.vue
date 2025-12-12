<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home-page">
    <!-- Hero Section -->
    <div class="hero-section text-center py-5 bg-light mb-5 rounded-3 shadow-sm mx-3 mt-3">
      <div class="container py-5">
        <h1 class="display-4 fw-bold text-dark mb-3">Cooking made easy.</h1>
        <p class="lead text-muted mb-4">
          Discover delicious recipes, save your favorites, and cook with confidence.
        </p>
        <RouterLink to="/search" class="btn btn-success btn-lg px-5 fw-bold shadow-sm">
          Start Searching 🍳
        </RouterLink>
      </div>
    </div>

    <!-- Features Section -->
    <div class="container mb-5">
      <div class="row g-4 text-center">
        <div class="col-md-4">
          <div class="p-4 border rounded-3 h-100 feature-card bg-white shadow-sm">
            <div class="fs-1 mb-3">🔍</div>
            <h3 class="h5 fw-bold text-dark">Find Recipes</h3>
            <p class="text-muted small mb-0">
              Search through thousands of recipes by ingredient or name instantly.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 border rounded-3 h-100 feature-card bg-white shadow-sm">
            <div class="fs-1 mb-3">❤️</div>
            <h3 class="h5 fw-bold text-dark">Save Favorites</h3>
            <p class="text-muted small mb-0">
              Create your personal cookbook by saving recipes you love.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 border rounded-3 h-100 feature-card bg-white shadow-sm">
            <div class="fs-1 mb-3">👩‍🍳</div>
            <h3 class="h5 fw-bold text-dark">Cook & Enjoy</h3>
            <p class="text-muted small mb-0">
              Follow easy step-by-step instructions to create amazing meals.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
}
.feature-card {
  transition: transform 0.2s;
}
.feature-card:hover {
  transform: translateY(-5px);
}
</style>
