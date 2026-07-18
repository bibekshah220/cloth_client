import api from '@/lib/axios';
import type { ApiResponse, Category } from '@/types';

export const categoryService = {
  getAll: async () => {
    const res = await api.get<ApiResponse<Category[]>>('/category');
    return res.data;
  },

  getById: async (categoryId: string) => {
    const res = await api.get<ApiResponse<Category>>(
      `/category/${categoryId}`
    );
    return res.data;
  },

  create: async (formData: FormData) => {
    const res = await api.post<ApiResponse<Category>>('/category', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  update: async (categoryId: string, formData: FormData) => {
    const res = await api.put<ApiResponse<Category>>(
      `/category/${categoryId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return res.data;
  },

  delete: async (categoryId: string) => {
    const res = await api.delete<ApiResponse<Category>>(
      `/category/${categoryId}`
    );
    return res.data;
  },
};
