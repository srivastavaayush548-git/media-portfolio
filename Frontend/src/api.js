import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const storedAdmin = localStorage.getItem('adminToken');
  if (storedAdmin) {
    try {
      const { token } = JSON.parse(storedAdmin);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Failed to parse stored admin token for API request", e);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
