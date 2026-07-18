import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
    select: (res) => res.data,
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getById(userId),
    select: (res) => res.data,
    enabled: !!userId,
  });
};
