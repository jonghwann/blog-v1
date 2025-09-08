import { getPosts } from '@/api/posts/api';
import Bio from '@/components/common/bio';
import PostList from '@/components/post/post-list';
import type { Post } from '@/types/post';

export default async function PostsPage() {
  let posts: Post[] = [];

  try {
    posts = await getPosts();
  } catch (error) {
    console.error(error);
    posts = [];
  }

  return (
    <section className='mt-4 w-full'>
      <Bio className='mb-12 border-b pb-12' />
      <PostList posts={posts} />
    </section>
  );
}
