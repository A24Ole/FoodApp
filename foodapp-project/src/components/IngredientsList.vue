<script setup>
import { useFavoritesStore } from '../stores/favorites'
import { defineEmits } from 'vue'

defineProps({
  ingredients: { type: Array, default: () => [] },
  loading: Boolean,
})

const emit = defineEmits(['select'])
const store = useFavoritesStore()

const toggleFavorite = (item, event) => {
  event.stopPropagation() // Prevent card click
  if (store.isFavorite(item.id)) {
    store.remove(item.id)
  } else {
    store.add(item)
  }
}
</script>

<template>
  <div class="row g-3">
    <div v-for="item in ingredients" :key="item.id" class="col-12">
      <div class="card recipe-card h-100 shadow-sm border-0" @click="$emit('select', item.id)">
        <div class="row g-0 align-items-center">
          <div class="col-4 col-sm-4">
            <img
              :src="item.image"
              :alt="item.name"
              class="img-fluid rounded-start h-100 object-fit-cover"
              style="min-height: 120px; max-height: 150px"
            />
          </div>
          <div class="col-8 col-sm-8">
            <div class="card-body py-2">
              <h5 class="card-title fw-bold text-dark mb-1 text-truncate">{{ item.name }}</h5>
              <p class="card-text text-muted small mb-2">
                <span class="badge bg-light text-secondary border me-1">{{ item.category }}</span>
                <span class="badge bg-light text-secondary border">{{ item.area }}</span>
              </p>
              <button
                class="btn btn-sm rounded-circle"
                :class="
                  store.isFavorite(item.id) ? 'btn-light text-danger' : 'btn-outline-secondary'
                "
                @click="(e) => toggleFavorite(item, e)"
                title="Toggle Favorite"
              >
                {{ store.isFavorite(item.id) ? '❤️' : '🤍' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="!loading && ingredients.length === 0" class="text-center text-muted py-5">
      No recipes found. Try searching for "Chicken".
    </div>
  </div>
</template>

<style scoped>
.recipe-card {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  overflow: hidden;
}

.recipe-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

/* Ensure images fill their container nicely in the horizontal card layout */
.object-fit-cover {
  object-fit: cover;
  width: 100%;
}
</style>
