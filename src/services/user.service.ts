import api from '@/lib/axios';
import type { ApiResponse, User, UpdateUserRequest } from '@/types';

export const userService = {
  getAll: async () => {
    const res = await api.get<ApiResponse<User[]>>('/user');
    return res.data;
  },

  getById: async (userId: string) => {
    const res = await api.get<ApiResponse<User>>(`/user/${userId}`);
    return res.data;
  },

  update: async (userId: string, data: UpdateUserRequest | FormData) => {
    const isFormData = data instanceof FormData;
    const res = await api.put<ApiResponse<User>>(`/user/${userId}`, data, {
      headers: isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : undefined,
    });
    return res.data;
  },

  delete: async (userId: string) => {
    const res = await api.delete<ApiResponse<User>>(`/user/${userId}`);
    return res.data;
  },
};
