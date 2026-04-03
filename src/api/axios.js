import axios from 'axios';

const api = axios.create({
  // Use a relative path /api for both Vercel and local development
  // Vite proxy handles this in local dev, Vercel routes handle it in production
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
