import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';
import type { CreateOrderRequest, UpdateOrderStatusRequest } from '@/types';
import { toast } from 'sonner';

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['orders', 'my'],
    queryFn: () => orderService.getMyOrders(),
    select: (res) => res.data,
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderService.getById(orderId),
    select: (res) => res.data,
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderRequest) => orderService.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => orderService.cancel(orderId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

// Admin
export const useAllOrders = () => {
  return useQuery({
    queryKey: ['orders', 'all'],
    queryFn: () => orderService.getAll(),
    select: (res) => res.data,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      data,
    }: {
      orderId: string;
      data: UpdateOrderStatusRequest;
    }) => orderService.updateStatus(orderId, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};
