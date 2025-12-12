import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
})

export const useApi = () => {
  const get = async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config)
      return response
    } catch (error) {
      if (error.response) {
        console.error('API Error:', error.response.status, error.response.data)
      } else if (error.request) {
        console.error('No response from server')
      } else {
        console.error('Configuration error:', error.message)
      }
      throw error
    }
  }

  return { get }
}
