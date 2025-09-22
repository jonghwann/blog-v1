import { getPosts } from '@/api/posts/api';
import { getTags } from '@/api/tags/api';
import Bio from '@/components/common/bio';
import TagList from '@/components/common/tag-list';
import PostList from '@/components/post/post-list';
import type { Post } from '@/types/post';
import type { Tag } from '@/types/tag';

export default async function PostsPage() {
  let posts: Post[] = [];
  let tags: Tag[] = [];

  try {
    [posts, tags] = await Promise.all([getPosts(), getTags()]);
  } catch (error) {
    console.error(error);
    posts = [];
    tags = [];
  }

  return (
    <section className='mt-7 w-full'>
      <Bio className='mb-12 border-b pb-12' />

      <div className='relative'>
        <PostList posts={posts} />
        <TagList tags={tags} className='absolute top-0 left-[112%] hidden 2xl:block' />
      </div>
    </section>
  );
}
