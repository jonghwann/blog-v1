import type { ApiResponse } from '@/types/api';
import { api } from '../api';
import type { LoginRequest } from './model';

export async function login(data: LoginRequest): Promise<ApiResponse> {
  return await api.post('auth/login', { json: data, credentials: 'include' }).json<ApiResponse>();
}

export async function refresh(): Promise<ApiResponse> {
  return await api.post('auth/refresh', { credentials: 'include' }).json<ApiResponse>();
}
