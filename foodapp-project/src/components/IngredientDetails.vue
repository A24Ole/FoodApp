<script setup>
import { useGemini } from '../composables/useGemini'

const props = defineProps({
  ingredient: Object, // Actually a recipe now
  loading: Boolean,
})

const { aiResponse, isGenerating, error: aiError, generateCreativeText } = useGemini()
</script>

<template>
  <div class="details-panel">
    <div v-if="loading" class="loading-state">Loading recipe...</div>

    <div v-else-if="ingredient" class="recipe-card">
      <div class="card-header">
        <div class="img-placeholder-large" v-if="!ingredient.image">🍲</div>
        <img v-else :src="ingredient.image" :alt="ingredient.name" />
        <h2>{{ ingredient.name }}</h2>
        <p class="subtitle">{{ ingredient.category }} | {{ ingredient.area }}</p>
      </div>

      <div class="recipe-content">
        <div class="ingredients-section">
          <h3>Ingredients</h3>
          <ul>
            <li v-for="(ing, index) in ingredient.ingredients" :key="index">
              <strong>{{ ing.name }}</strong
              >: {{ ing.measure }}
            </li>
          </ul>
        </div>

        <div class="instructions-section">
          <h3>Instructions</h3>
          <p>{{ ingredient.instructions }}</p>
        </div>

        <div v-if="ingredient.youtube" class="video-link">
          <a :href="ingredient.youtube" target="_blank">Watch on YouTube</a>
        </div>

        <!-- AI Section -->
        <div class="ai-container">
          <h3>✨ Informació Extra (IA)</h3>

          <button
            @click="generateCreativeText(ingredient.name)"
            :disabled="isGenerating"
            class="btn btn-info text-white"
          >
            {{ isGenerating ? 'Pensant...' : 'Generar dada de calories (100g)' }}
          </button>

          <p v-if="aiError" class="text-danger mt-2">{{ aiError }}</p>
          <p v-if="aiResponse" class="response-box">
            {{ aiResponse }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="placeholder">👈 Select a recipe to see details.</div>
  </div>
</template>

<style scoped>
.details-panel {
  background: #fafafa;
  border-radius: 15px;
  padding: 20px;
  min-height: 400px;
  border: 2px dashed #ddd;
  overflow-y: auto;
  max-height: 80vh;
}
.recipe-card {
  text-align: left;
  animation: fadeIn 0.3s;
}
.card-header {
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}
.recipe-card img,
.img-placeholder-large {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.img-placeholder-large {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: #f0f0f0;
  margin: 0 auto 10px auto;
}
.subtitle {
  color: #888;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.recipe-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ingredients-section h3,
.instructions-section h3 {
  color: #4caf50;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.ingredients-section ul {
  list-style-type: disc;
  padding-left: 20px;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Two columns for ingredients if space permits */
  gap: 5px;
}

.instructions-section p {
  line-height: 1.6;
  white-space: pre-line; /* Respect line breaks in instructions */
  color: #444;
}

.placeholder {
  color: #aaa;
  text-align: center;
  margin-top: 50px;
}
.loading-state {
  padding-top: 100px;
  color: #4caf50;
  font-weight: bold;
  text-align: center;
}

.video-link {
  margin-top: 20px;
  text-align: center;
}
.video-link a {
  display: inline-block;
  background: #ff0000;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ai-container {
  margin-top: 30px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 10px;
  text-align: center;
}

.response-box {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  border: 1px solid #bbdefb;
  font-style: italic;
  color: #0d47a1;
}
</style>
