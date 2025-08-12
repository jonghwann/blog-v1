import type { Post } from '@/types/post';
import type { ApiResponse } from '../model';

export type GetPostsResponseData = Post[];

export type GetPostsResponse = ApiResponse<GetPostsResponseData>;
