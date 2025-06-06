import axios from './axios'

export const login = async (email, password) => {
  try {
    const response = await axios.post('/auth/login', { email, password })
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message)
    throw err
  }
}

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post('/auth/signup', { name, email, password })
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data
  } catch (err) {
    console.error('Signup failed:', err.response?.data || err.message)
    throw err
  }
}
