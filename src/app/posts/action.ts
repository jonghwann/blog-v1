'use server';

import { put } from '@vercel/blob';

export async function uploadImageAction(file: File): Promise<string> {
  try {
    const blob = await put(file.name, file, { access: 'public' });
    return blob.url;
  } catch (error) {
    console.error('Error in uploadImageAction:', error);
    throw new Error('Failed to upload image');
  }
}
