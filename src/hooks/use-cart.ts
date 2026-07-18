import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/cart.service';
import type { AddToCartRequest, UpdateCartItemRequest, RemoveCartItemRequest } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

export const useCart = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['cart'],
    queryFn: () => cartService.getCart(),
    select: (res) => res.data,
    enabled: isAuthenticated,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddToCartRequest) => cartService.addItem(data),
    onSuccess: (res) => {
      queryClient.setQueryData(['cart'], res);
      toast.success('Added to bag');
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCartItemRequest) => cartService.updateItem(data),
    onSuccess: (res) => {
      queryClient.setQueryData(['cart'], res);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemoveCartItemRequest) => cartService.removeItem(data),
    onSuccess: (res) => {
      queryClient.setQueryData(['cart'], res);
      toast.success('Removed from bag');
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Bag cleared');
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};
