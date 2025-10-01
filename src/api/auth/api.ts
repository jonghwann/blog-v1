import { api } from '../api';
import type { ApiResponse } from '../model';
import type { GetMeResponse, LoginRequest } from './model';

export async function getMe(): Promise<GetMeResponse> {
  const response = await api.get('auth/me', { credentials: 'include' }).json<ApiResponse<GetMeResponse>>();
  return response.data;
}

export async function login(data: LoginRequest): Promise<ApiResponse> {
  return await api.post('auth/login', { json: data, credentials: 'include' }).json();
}

export async function refresh(): Promise<ApiResponse> {
  return await api.post('auth/refresh', { credentials: 'include' }).json();
}

export async function logout(): Promise<ApiResponse> {
  return await api.post('auth/logout', { credentials: 'include' }).json();
}
