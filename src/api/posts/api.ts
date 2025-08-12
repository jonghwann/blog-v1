import { api } from '../api';
import type { GetPostsResponse, GetPostsResponseData } from './model.ts';

export async function getPosts(tag?: string): Promise<GetPostsResponseData> {
  try {
    const response = await api.get('posts', { ...(tag && { searchParams: { tag } }) }).json<GetPostsResponse>();
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
