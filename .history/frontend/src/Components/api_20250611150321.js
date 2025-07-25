import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/', // backend URL
});

// const api = axios.create({
//   baseURL: 'https://quiz-app-backend-smoky.vercel.app/', // deployes backend URL
// });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
