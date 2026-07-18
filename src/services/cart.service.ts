import api from '@/lib/axios';
import type {
  ApiResponse,
  Cart,
  AddToCartRequest,
  UpdateCartItemRequest,
  RemoveCartItemRequest,
} from '@/types';

export const cartService = {
  getCart: async () => {
    const res = await api.get<ApiResponse<Cart>>('/cart');
    return res.data;
  },

  addItem: async (data: AddToCartRequest) => {
    const res = await api.post<ApiResponse<Cart>>('/cart/add', data);
    return res.data;
  },

  updateItem: async (data: UpdateCartItemRequest) => {
    const res = await api.put<ApiResponse<Cart>>('/cart/update', data);
    return res.data;
  },

  removeItem: async (data: RemoveCartItemRequest) => {
    const res = await api.delete<ApiResponse<Cart>>('/cart/remove', { data });
    return res.data;
  },

  clearCart: async () => {
    const res = await api.delete<ApiResponse<Cart>>('/cart/clear');
    return res.data;
  },
};
