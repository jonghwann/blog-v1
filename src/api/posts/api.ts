import { processPostData } from '@/lib/posts';
import type { Post, PostDetail } from '@/types/post';
import { api } from '../api';
import type { ApiResponse } from '../model';
import type { PostRequest } from './model';

export async function getPosts(tag?: string): Promise<Post[]> {
  const response = await api.get('posts', { ...(tag && { searchParams: { tag } }) }).json<ApiResponse<Post[]>>();
  return response.data;
}

export async function getPost(id: number): Promise<PostDetail> {
  const response = await api.get(`posts/${id}`).json<ApiResponse<PostDetail>>();
  return response.data;
}

export async function updatePost(params: PostRequest): Promise<Post> {
  const { id, data } = params;
  const processedData = processPostData(data);
  const response = await api.put(`posts/${id}`, { json: processedData, credentials: 'include' }).json<ApiResponse<Post>>();
  return response.data;
}
