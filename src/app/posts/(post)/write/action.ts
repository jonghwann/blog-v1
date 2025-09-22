'use server';

import { createPost } from '@/db/posts';
import { parsePostFormData } from '@/lib/posts';

interface WriteActionState {
  success: boolean;
  postId?: number;
}

export async function writeAction(_prevState: unknown, formData: FormData): Promise<WriteActionState> {
  const data = parsePostFormData(formData);

  try {
    const post = await createPost(data);
    return { success: true, postId: post.id };
  } catch (error) {
    console.error('Error in writeAction:', error);
    return { success: false };
  }
}
