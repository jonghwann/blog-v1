import { getPosts } from '@/api/posts/api';
import FabLink from '@/components/common/fab-link';
import PostList from '@/components/post/post-list';

interface PostsPageProps {
  searchParams: Promise<{ tag: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { tag } = await searchParams;

  const posts = await getPosts(tag);

  return (
    <section className='mx-auto flex w-full max-w-(--breakpoint-xl) lg:gap-10'>
      <div className='relative flex-2 px-4'>
        <PostList posts={posts} />
        <FabLink href='/posts/write' />
      </div>

      <aside className='hidden flex-1 border-l px-4 md:block'>
        <section className='flex flex-col gap-3'>
          <h2 className='font-medium text-secondary-foreground text-sm'>Tags</h2>

          <nav>{/* <TagList tags={tags} selectedTags={selectedTags} /> */}</nav>
        </section>
      </aside>
    </section>
  );
}
