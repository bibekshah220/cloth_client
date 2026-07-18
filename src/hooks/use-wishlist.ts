import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '@/services/wishlist.service';
import type { AddToWishlistRequest } from '@/types';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

export const useWishlist = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistService.getWishlist(),
    select: (res) => res.data,
    enabled: isAuthenticated,
  });
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddToWishlistRequest) =>
      wishlistService.addToWishlist(data),
    onSuccess: (res) => {
      queryClient.setQueryData(['wishlist'], res);
      toast.success('Added to wishlist');
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) =>
      wishlistService.removeFromWishlist(productId),
    onSuccess: (res) => {
      queryClient.setQueryData(['wishlist'], res);
      toast.success('Removed from wishlist');
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useClearWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => wishlistService.clearWishlist(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};
