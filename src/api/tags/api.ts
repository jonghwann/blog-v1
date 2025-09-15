import type { Tag } from '@/types/tag';
import { api } from '../api';
import type { ApiResponse } from '../model';

export async function getTags(): Promise<Tag[]> {
  const response = await api.get('tags').json<ApiResponse<Tag[]>>();
  return response.data;
}
