import axios from './axios'

export const queryToAI = async (query) => {
  try {
    const response = await axios.post('/ai', { prompt: query })
    const output = response.data?.output
    return output
  } catch (err) {
    console.error('Query to AI failed:', err.response?.data || err.message)
    throw err
  }
}
