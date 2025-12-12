import axios from 'axios'

class CommunicationManager {
  constructor() {
    this.apiBaseUrl = 'https://www.themealdb.com/api/json/v1/1/'

    this.apiClient = axios.create({
      baseURL: this.apiBaseUrl,
      // TheMealDB doesn't require an API key for the free tier
    })
  }

  _handleError(error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('No response from server')
    } else {
      console.error('Configuration error:', error.message)
    }
    throw new Error('Error connecting to TheMealDB API')
  }

  /**
   * 1. Search meals by name
   * GET /search.php?s=...
   */
  async searchRecipes(query) {
    if (!query) return []

    try {
      const response = await this.apiClient.get('/search.php', {
        params: {
          s: query,
        },
      })

      const meals = response.data.meals || []

      return meals.map((meal) => this._mapMealToAppFormat(meal))
    } catch (error) {
      this._handleError(error)
      return []
    }
  }

  /**
   * 2. Get meal details by ID
   * GET /lookup.php?i=...
   */
  async getRecipeDetails(id) {
    try {
      const response = await this.apiClient.get('/lookup.php', {
        params: {
          i: id,
        },
      })

      const meals = response.data.meals || []
      if (meals.length === 0) throw new Error('Recipe not found')

      return this._mapMealToAppFormat(meals[0])
    } catch (error) {
      this._handleError(error)
    }
  }

  /**
   * Helper to map TheMealDB format to our internal format
   */
  _mapMealToAppFormat(meal) {
    // Extract ingredients and measures
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
}

export default new CommunicationManager()
