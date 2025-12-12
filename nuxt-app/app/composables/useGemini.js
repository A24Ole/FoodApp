// Imports removed for Nuxt auto-import
import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_KEY

const genAI = new GoogleGenerativeAI(API_KEY)

export const useGemini = () => {
    const aiResponse = ref('')
    const isGenerating = ref(false)
    const error = ref(null)

    const generateCreativeText = async (itemName) => {
        isGenerating.value = true
        error.value = null
        aiResponse.value = ''

        try {
            // Updated to 'gemini-1.5-flash' which is the standard current stable model
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

            const prompt = `Calcula las calorías aproximadas por cada 100g de "${itemName}" y da un breve resumen nutricional conciso (máximo 40 palabras).`

            const result = await model.generateContent(prompt)
            const response = await result.response
            aiResponse.value = response.text()
        } catch (e) {
            console.error('Gemini Error:', e)

            if (e.message?.includes('404')) {
                error.value = `Error (404): Model 'gemini-2.5-flash' not found or path incorrect.`
            } else if (e.message?.includes('400') || e.message?.includes('API key')) {
                error.value = `API Key Error: Invalid or revoked key.`
            } else if (e.message?.includes('429')) {
                error.value = `Error (429): Quota exceeded.`
            } else {
                error.value = `Unknown Error: ${e.message}`
            }
        } finally {
            isGenerating.value = false
        }
    }

    return { aiResponse, isGenerating, error, generateCreativeText }
}
