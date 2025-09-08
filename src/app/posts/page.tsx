import { getPosts } from '@/api/posts/api';
import Bio from '@/components/common/bio';
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
    <section className='mt-4'>
      <Bio />
      {/* <div className='relative flex-2 px-4'>
        <PostList posts={posts} />
        <FabLink href='/posts/write' />
      </div>

      <aside className='hidden flex-1 border-l px-4 md:block'>
        <section className='flex flex-col gap-3'>
          <h2 className='font-medium text-secondary-foreground text-sm'>Tags</h2>

          <nav><TagList tags={tags} selectedTags={selectedTags} /></nav>
        </section>
      </aside> */}
    </section>
  );
}
