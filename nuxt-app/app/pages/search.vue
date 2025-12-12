<script setup>
// Imports removed for Nuxt auto-import

// Usamos el composable
const {
  paginatedResults: ingredients, // Bind paginated results to ingredients
  selectedRecipe: ingredientSelected,
  loading,
  error,
  searchRecipes: handleSearch,
  getRecipeDetails: handleSelect,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
} = useSearch()
</script>

<template>
  <div class="search-page">
    <header class="mb-4 text-center">
      <h1 class="display-4 text-success">Search Recipes</h1>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <SearchBar @search="handleSearch" :loading="loading" />
        </div>
      </div>
    </header>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="row">
      <div class="col-md-5 mb-4">
        <IngredientsList :ingredients="ingredients" :loading="loading" @select="handleSelect" />

        <!-- Pagination Controls -->
        <nav v-if="totalPages > 1" aria-label="Recipe navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage">Previous</button>
            </li>
            <li class="page-item disabled">
              <span class="page-link">Page {{ currentPage }} of {{ totalPages }}</span>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage">Next</button>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-7">
        <div class="sticky-top" style="top: 20px; z-index: 1">
          <IngredientDetails :ingredient="ingredientSelected" :loading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Bootstrap handles most layout now */
</style>
