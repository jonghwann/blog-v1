import { api } from '../api';
import type { ApiResponse } from '../model';
import type { uploadImageResponse } from './model';

export async function uploadImage(file: File): Promise<uploadImageResponse> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await api
    .post('upload/image', { body: formData, headers: undefined, credentials: 'include' })
    .json<ApiResponse<uploadImageResponse>>();

  return response.data;
}
