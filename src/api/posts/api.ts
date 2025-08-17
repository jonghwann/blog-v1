import type { Post } from '@/types/post';
import { api } from '../api';
import type { ApiResponse } from '../model';

export async function getPosts(tag?: string): Promise<Post[]> {
  const response = await api.get('posts', { ...(tag && { searchParams: { tag } }) }).json<ApiResponse<Post[]>>();
  return response.data;
}
