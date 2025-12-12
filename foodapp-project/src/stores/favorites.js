import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  // Load from LocalStorage
  const initialize = () => {
    const stored = localStorage.getItem('favorites')
    if (stored) {
      try {
        favorites.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse favorites', e)
        favorites.value = []
      }
    }
  }

  // Save to LocalStorage
  const _save = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const add = (recipe) => {
    if (!favorites.value.find((f) => f.id === recipe.id)) {
      favorites.value.push(recipe)
      _save()
    }
  }

  const remove = (id) => {
    favorites.value = favorites.value.filter((f) => f.id !== id)
    _save()
  }

  const isFavorite = (id) => {
    return !!favorites.value.find((f) => f.id === id)
  }

  // Initialize immediately
  initialize()

  return {
    favorites,
    add,
    remove,
    isFavorite,
  }
})
