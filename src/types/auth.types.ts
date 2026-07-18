import type { Role, Gender } from './enums';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: Role;
  phone?: string;
  gender?: Gender;
}

export interface VerifyResetTokenResponse {
  valid: boolean;
}
