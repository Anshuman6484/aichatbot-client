import axios from './axios'

export const queryToAI = async (messages) => {
  try {
    const response = await axios.post('/ai', { messages })
    const output = response.data?.output
    return output
  } catch (err) {
    console.error('Query to AI failed:', err.response?.data || err.message)
    throw err
  }
}
