import { processPostData } from '@/lib/posts';
import type { Post, PostDetail, PostSummary } from '@/types/post';
import { api } from '../api';
import type { ApiResponse } from '../model';
import type { PostRequest } from './model';

export async function getPosts(tag?: string): Promise<PostSummary[]> {
  const response = await api.get('posts', { ...(tag && { searchParams: { tag } }) }).json<ApiResponse<PostSummary[]>>();
  return response.data;
}

export async function getPost(id: number): Promise<PostDetail> {
  const response = await api.get(`posts/${id}`).json<ApiResponse<PostDetail>>();
  return response.data;
}

export async function updatePost(params: PostRequest): Promise<Post> {
  const { id, data } = params;
  const processedData = await processPostData(data);

  const response = await api.put(`posts/${id}`, { json: processedData, credentials: 'include' }).json<ApiResponse<Post>>();
  return response.data;
}
