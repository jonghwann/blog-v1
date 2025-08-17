import type { User } from '@/types/user';

export interface GetMeResponse {
  isLogin: boolean;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}
