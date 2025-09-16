import type { Post } from '@/types/post';
import { api } from '../api';
import type { ApiResponse } from '../model';

export async function getSearchPosts(q?: string): Promise<Post[]> {
  const response = await api.get('search', { ...(q && { searchParams: { q } }) }).json<ApiResponse<Post[]>>();
  return response.data;
}
