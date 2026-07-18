import axios from 'axios';
import type { ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as ApiResponse | undefined;
      const message = data?.message || error.message || 'Something went wrong';
      const status = error.response?.status || 500;

      if (status === 401) {
        const isAuthRoute = window.location.pathname.startsWith('/auth');
        if (!isAuthRoute) {
          window.location.href = '/auth/login';
        }
      }

      return Promise.reject({ message, status, statusCode: status });
    }
    return Promise.reject(error);
  }
);

export default api;
