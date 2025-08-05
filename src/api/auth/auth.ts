import { api } from '../api';
import type { LoginRequest, LoginResponse, LogoutResponse, RefreshResponse } from './model';

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return await api.post('auth/login', { json: data, credentials: 'include' }).json<LoginResponse>();
}

export async function refresh(): Promise<RefreshResponse> {
  return await api.post('auth/refresh', { credentials: 'include' }).json<RefreshResponse>();
}

export async function logout(): Promise<LogoutResponse> {
  return await api.post('auth/logout', { credentials: 'include' }).json<LogoutResponse>();
}
