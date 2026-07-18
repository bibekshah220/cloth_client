import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
    select: (res) => res.data,
  });
};

export const useSalesAnalytics = (period?: number) => {
  return useQuery({
    queryKey: ['dashboard', 'analytics', period],
    queryFn: () => dashboardService.getAnalytics(period),
    select: (res) => res.data,
  });
};
