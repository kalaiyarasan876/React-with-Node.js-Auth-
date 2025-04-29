import axios from 'axios'

const API_URL = 'http://localhost:8000/api/auth';

export const loginAPI = async (data) => {
  const response = await axios.post(`${API_URL}/signin`,data)
  return response.data
}

export const registerAPI = async (data) => {
  const response = await axios.post(`${API_URL}/signup`, data)
  return response.data
}

export const logoutAPI = async (data) => {
  const response = await axios.post(`${API_URL}/logout`, data)
  return response.data
}
