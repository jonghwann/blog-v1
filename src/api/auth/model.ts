import type { User } from '@/types/user';

export interface GetMeResponse {
  isLogin: boolean;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
}

export interface RefreshResponse {
  code: number;
  message: string;
}

export interface LogoutResponse {
  code: number;
  message: string;
}
