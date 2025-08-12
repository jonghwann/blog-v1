import { api } from '../api';
import type { ApiResponse } from '../model';
import type { LoginRequest } from './model';

export async function login(data: LoginRequest): Promise<ApiResponse> {
  return await api.post('auth/login', { json: data, credentials: 'include' }).json();
}

export async function refresh(): Promise<ApiResponse> {
  return await api.post('auth/refresh', { credentials: 'include' }).json<ApiResponse>();
}

export async function logout(): Promise<ApiResponse | null> {
  try {
    return await api.post('auth/logout', { credentials: 'include' }).json<ApiResponse>();
  } catch (error) {
    console.error(error);
    return null;
  }
}
