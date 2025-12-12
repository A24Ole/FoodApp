// Imports removed for Nuxt auto-import

export const useSearch = () => {
  const api = useApi()

  const query = ref('')
  const results = ref([])
  const selectedRecipe = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Pagination State
  const currentPage = ref(1)
  const itemsPerPage = 5

  // Helper function to map data (same as communicationManager)
  const _mapMealToAppFormat = (meal) => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({
          name: ingredient,
          measure: measure ? measure.trim() : '',
        })
      }
    }

    return {
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      instructions: meal.strInstructions,
      ingredients: ingredients,
      tags: meal.strTags ? meal.strTags.split(',') : [],
      youtube: meal.strYoutube,
      raw: meal,
    }
  }

  const searchRecipes = async (searchQuery) => {
    loading.value = true
    error.value = null
    query.value = searchQuery
    selectedRecipe.value = null
    currentPage.value = 1 // Reset to first page

    if (!searchQuery) {
      results.value = []
      loading.value = false
      return
    }

    try {
      const response = await api.get('/search.php', {
        params: { s: searchQuery },
      })
      const meals = response.data.meals || []
      results.value = meals.map(_mapMealToAppFormat)
    } catch (e) {
      error.value = 'Error loading recipes'
      results.value = []
    } finally {
      loading.value = false
    }
  }

  const getRecipeDetails = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/lookup.php', {
        params: { i: id },
      })
      const meals = response.data.meals || []
      if (meals.length > 0) {
        selectedRecipe.value = _mapMealToAppFormat(meals[0])
      } else {
        error.value = 'Recipe not found'
      }
    } catch (e) {
      error.value = 'Error loading recipe details'
    } finally {
      loading.value = false
    }
  }

  // Pagination Computed
  const paginatedResults = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return results.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(results.value.length / itemsPerPage)
  })

  // Pagination Methods
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    query,
    results,
    paginatedResults, // Use this for display
    totalPages,
    currentPage,
    selectedRecipe,
    loading,
    error,
    searchRecipes,
    getRecipeDetails,
    nextPage,
    prevPage,
  }
}
