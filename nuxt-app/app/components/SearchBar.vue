<script setup>
// Imports removed for Nuxt auto-import

const props = defineProps({
  loading: Boolean,
})

const emit = defineEmits(['search'])

const query = ref('')
let debounceTimeout = null

const onSearch = () => {
  if (query.value.trim()) {
    emit('search', query.value)
  }
}

const onInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout)

  debounceTimeout = setTimeout(() => {
    onSearch()
  }, 500)
}
</script>

<template>
  <div class="search-bar-container">
    <form @submit.prevent="onSearch" class="d-flex">
      <div class="input-group input-group-lg shadow-sm rounded-pill overflow-hidden">
        <span class="input-group-text bg-white border-0 ps-4"> 🔍 </span>
        <input
          type="text"
          class="form-control border-0"
          placeholder="Search for recipes (e.g. Chicken)..."
          v-model="query"
          @input="onInput"
          style="box-shadow: none"
        />
        <button class="btn btn-success px-4 fw-bold" type="submit" :disabled="loading">
          {{ loading ? '...' : 'Search' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* No custom styling needed, mostly Bootstrap utilities */
</style>
