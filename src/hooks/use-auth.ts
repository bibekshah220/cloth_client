import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import type { LoginRequest, SignupRequest, ForgotPasswordRequest, ResetPasswordRequest } from '@/types';
import { toast } from 'sonner';

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (res) => {
      if (res.data) {
        setUser(res.data);
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast.success(res.message);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};

export const useLogout = () => {
  const clearUser = useAuthStore((s) => s.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      toast.success('Logged out successfully');
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      authService.resetPassword(data),
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message);
    },
  });
};
