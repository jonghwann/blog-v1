import { getPosts } from '@/api/posts/api';
import { getTags } from '@/api/tags/api';
import type { Post } from '@/types/post';
import type { Tag } from '@/types/tag';

export async function getPostsAndTags(tag?: string) {
  let posts: Post[] = [];
  let tags: Tag[] = [];

  try {
    [posts, tags] = await Promise.all([getPosts(tag), getTags()]);
  } catch (error) {
    console.error(error);
    posts = [];
    tags = [];
  }

  return { posts, tags };
}
