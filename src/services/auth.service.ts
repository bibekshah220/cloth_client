import api from '@/lib/axios';
import type {
  ApiResponse,
  AuthUser,
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyResetTokenResponse,
} from '@/types';

export const authService = {
  signup: async (data: SignupRequest) => {
    const res = await api.post<ApiResponse<AuthUser>>('/auth/signup', data);
    return res.data;
  },

  login: async (data: LoginRequest) => {
    const res = await api.post<ApiResponse<AuthUser>>('/auth/login', data);
    return res.data;
  },

  logout: async () => {
    const res = await api.post<ApiResponse>('/auth/logout');
    return res.data;
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const res = await api.post<ApiResponse>('/auth/forgot-password', data);
    return res.data;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const res = await api.post<ApiResponse>('/auth/reset-password', data);
    return res.data;
  },

  verifyResetToken: async (token: string) => {
    const res = await api.get<ApiResponse<VerifyResetTokenResponse>>(
      `/auth/verify-reset-token/${token}`
    );
    return res.data;
  },
};
