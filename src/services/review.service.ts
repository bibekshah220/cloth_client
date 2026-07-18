import api from '@/lib/axios';
import type {
  ApiResponse,
  PaginatedData,
  Review,
  CreateReviewRequest,
  UpdateReviewRequest,
  ProductReviewsData,
  PaginationParams,
} from '@/types';

export const reviewService = {
  getProductReviews: async (productId: string, params?: PaginationParams) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));

    const res = await api.get<ApiResponse<ProductReviewsData>>(
      `/review/product/${productId}?${query.toString()}`
    );
    return res.data;
  },

  getMyReviews: async (params?: PaginationParams) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));

    const res = await api.get<ApiResponse<PaginatedData<Review>>>(
      `/review/my?${query.toString()}`
    );
    return res.data;
  },

  create: async (data: CreateReviewRequest) => {
    const res = await api.post<ApiResponse<Review>>('/review', data);
    return res.data;
  },

  update: async (reviewId: string, data: UpdateReviewRequest) => {
    const res = await api.put<ApiResponse<Review>>(
      `/review/${reviewId}`,
      data
    );
    return res.data;
  },

  delete: async (reviewId: string) => {
    const res = await api.delete<ApiResponse<Review>>(`/review/${reviewId}`);
    return res.data;
  },

  // Admin
  getAll: async (params?: PaginationParams) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));

    const res = await api.get<ApiResponse<PaginatedData<Review>>>(
      `/review?${query.toString()}`
    );
    return res.data;
  },

  adminDelete: async (reviewId: string) => {
    const res = await api.delete<ApiResponse<Review>>(
      `/review/admin/${reviewId}`
    );
    return res.data;
  },
};
