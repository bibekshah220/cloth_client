import api from '@/lib/axios';
import type {
  ApiResponse,
  Wishlist,
  AddToWishlistRequest,
} from '@/types';

export const wishlistService = {
  getWishlist: async () => {
    const res = await api.get<ApiResponse<Wishlist>>('/wishlist');
    return res.data;
  },

  addToWishlist: async (data: AddToWishlistRequest) => {
    const res = await api.post<ApiResponse<Wishlist>>('/wishlist/add', data);
    return res.data;
  },

  removeFromWishlist: async (productId: string) => {
    const res = await api.delete<ApiResponse<Wishlist>>(
      `/wishlist/${productId}`
    );
    return res.data;
  },

  clearWishlist: async () => {
    const res = await api.delete<ApiResponse<Wishlist>>('/wishlist');
    return res.data;
  },
};
