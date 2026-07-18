import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '@/services/review.service';
import type { CreateReviewRequest, UpdateReviewRequest, PaginationParams } from '@/types';
import { toast } from 'sonner';

export const useProductReviews = (productId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['reviews', 'product', productId, params],
    queryFn: () => reviewService.getProductReviews(productId, params),
    select: (res) => res.data,
    enabled: !!productId,
  });
};

export const useMyReviews = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['reviews', 'my', params],
    queryFn: () => reviewService.getMyReviews(params),
    select: (res) => res.data,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReviewRequest) => reviewService.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewRequest }) =>
      reviewService.update(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewService.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

// Admin
export const useAllReviews = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['reviews', 'all', params],
    queryFn: () => reviewService.getAll(params),
    select: (res) => res.data,
  });
};

export const useAdminDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewService.adminDelete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};
