import Bio from '@/components/common/bio';
import TagList from '@/components/common/tag-list';
import PostList from '@/components/post/post-list';
import { getPostsAndTags } from '@/lib/data';

export default async function PostsPage() {
  const { posts, tags } = await getPostsAndTags();

  return (
    <section className='mt-7 w-full'>
      <Bio className='mb-12 border-b pb-12' />

      <div className='relative'>
        <PostList posts={posts} />
        <TagList tags={tags} className='absolute top-0 left-[112%] hidden xl:block' />
      </div>
    </section>
  );
}
