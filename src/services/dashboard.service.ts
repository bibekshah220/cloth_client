import api from '@/lib/axios';
import type { ApiResponse, DashboardStats, SalesAnalytics } from '@/types';

export const dashboardService = {
  getStats: async () => {
    const res = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return res.data;
  },

  getAnalytics: async (period?: number) => {
    const params = period ? `?period=${period}` : '';
    const res = await api.get<ApiResponse<SalesAnalytics>>(
      `/dashboard/analytics${params}`
    );
    return res.data;
  },
};
