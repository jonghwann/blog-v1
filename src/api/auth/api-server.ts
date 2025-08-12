'use server';
import { cookies } from 'next/headers';
import { api } from '../api';
import type { GetMeResponse, GetMeResponseData } from './model';

export async function getMe(): Promise<GetMeResponseData> {
  try {
    const cookie = await cookies();
    const response = await api.get('auth/me', { headers: { Cookie: cookie.toString() } }).json<GetMeResponse>();
    return response.data;
  } catch (error) {
    console.error(error);
    return { isLogin: false, user: null };
  }
}
