'use server';
import { cookies } from 'next/headers';
import { api } from '../api';
import type { GetMeResponse } from './model';

export async function getMe(): Promise<GetMeResponse> {
  const cookie = await cookies();
  return await api.get('auth/me', { headers: { Cookie: cookie.toString() } }).json<GetMeResponse>();
}
