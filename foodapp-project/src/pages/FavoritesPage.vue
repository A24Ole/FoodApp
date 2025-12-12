<script setup>
import { ref } from 'vue'
import { useFavoritesStore } from '../stores/favorites'
import IngredientsList from '../components/IngredientsList.vue'
import IngredientDetails from '../components/IngredientDetails.vue'
import { useRouter } from 'vue-router'

const store = useFavoritesStore()
const router = useRouter()
const selectedRecipe = ref(null)

const handleSelect = (id) => {
  const recipe = store.favorites.find((r) => r.id === id)
  if (recipe) {
    selectedRecipe.value = recipe
  }
}
</script>

<template>
  <div class="favorites-page container py-4">
    <h1 class="text-success fw-bold mb-4">My Favorites</h1>

    <div v-if="store.favorites.length === 0" class="text-center text-muted py-5">
      <h3>You haven't saved any recipes yet.</h3>
      <p>Go to the <RouterLink to="/search">Search</RouterLink> page to find some!</p>
    </div>

    <div class="row" v-else>
      <div class="col-md-5 mb-4">
        <IngredientsList :ingredients="store.favorites" :loading="false" @select="handleSelect" />
      </div>
      <div class="col-md-7">
        <div class="sticky-top" style="top: 20px; z-index: 1">
          <IngredientDetails :ingredient="selectedRecipe" :loading="false" />
          <div v-if="!selectedRecipe" class="alert alert-light text-center border mt-4">
            Select a recipe to view details
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
