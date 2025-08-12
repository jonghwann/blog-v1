import type { User } from '@/types/user';
import type { ApiResponse } from '../model';

export interface GetMeResponseData {
  isLogin: boolean;
  user: User | null;
}

export type GetMeResponse = ApiResponse<GetMeResponseData>;

export interface LoginRequest {
  email: string;
  password: string;
}
