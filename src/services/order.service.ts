import api from '@/lib/axios';
import type {
  ApiResponse,
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
} from '@/types';

export const orderService = {
  create: async (data: CreateOrderRequest) => {
    const res = await api.post<ApiResponse<Order>>('/order', data);
    return res.data;
  },

  getMyOrders: async () => {
    const res = await api.get<ApiResponse<Order[]>>('/order/my');
    return res.data;
  },

  getById: async (orderId: string) => {
    const res = await api.get<ApiResponse<Order>>(`/order/${orderId}`);
    return res.data;
  },

  cancel: async (orderId: string) => {
    const res = await api.post<ApiResponse<Order>>(`/order/${orderId}/cancel`);
    return res.data;
  },

  // Admin
  getAll: async () => {
    const res = await api.get<ApiResponse<Order[]>>('/order');
    return res.data;
  },

  updateStatus: async (orderId: string, data: UpdateOrderStatusRequest) => {
    const res = await api.patch<ApiResponse<Order>>(
      `/order/${orderId}/status`,
      data
    );
    return res.data;
  },
};
