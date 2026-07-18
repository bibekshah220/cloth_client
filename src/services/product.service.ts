import api from '@/lib/axios';
import type {
  ApiResponse,
  PaginatedData,
  Product,
  ProductFilters,
} from '@/types';

export const productService = {
  getAll: async (filters?: ProductFilters) => {
    const params = new URLSearchParams();
    if (filters?.category) params.set('category', filters.category);
    if (filters?.search) params.set('search', filters.search);
    if (filters?.page) params.set('page', String(filters.page));
    if (filters?.limit) params.set('limit', String(filters.limit));

    const res = await api.get<ApiResponse<PaginatedData<Product>>>(
      `/product?${params.toString()}`
    );
    return res.data;
  },

  getById: async (productId: string) => {
    const res = await api.get<ApiResponse<Product>>(`/product/${productId}`);
    return res.data;
  },

  create: async (formData: FormData) => {
    const res = await api.post<ApiResponse<Product>>('/product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  update: async (productId: string, formData: FormData) => {
    const res = await api.put<ApiResponse<Product>>(
      `/product/${productId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return res.data;
  },

  delete: async (productId: string) => {
    const res = await api.delete<ApiResponse<Product>>(
      `/product/${productId}`
    );
    return res.data;
  },
};
