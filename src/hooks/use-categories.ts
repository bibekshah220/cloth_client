import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';
import { toast } from 'sonner';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAll(),
    select: (res) => res.data,
  });
};

export const useCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoryService.getById(categoryId),
    select: (res) => res.data,
    enabled: !!categoryId,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => categoryService.create(formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      categoryService.update(id, formData),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => toast.error(err.message),
  });
};
