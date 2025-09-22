'use server';

import { revalidatePath } from 'next/cache';

import { updatePost } from '@/db/posts';
import { parsePostFormData } from '@/lib/posts';

interface EditActionState {
  success: boolean;
  postId?: number;
}

export async function editAction(_prevState: unknown, formData: FormData): Promise<EditActionState> {
  const data = parsePostFormData(formData);
  const id = Number(formData.get('id'));

  try {
    await updatePost({ ...data, id });
    revalidatePath(`/posts/${id}`);
    return { success: true, postId: id };
  } catch (error) {
    console.error('Error in editAction:', error);
    return { success: false };
  }
}
