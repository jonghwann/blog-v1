import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/api/posts/api';
import Bio from '@/components/common/bio';
import ScrollProgressBar from '@/components/common/scroll-progress-bar';
import PostContent from '@/components/post/post-content';
import PostHeader from '@/components/post/post-header';
import PostNavigation from '@/components/post/post-navigation';
import PostTableOfContents from '@/components/post/post-table-of-contents';
import type { Navigation, Post } from '@/types/post';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  let post: Post;
  let navigation: Navigation;

  try {
    ({ post, navigation } = await getPost(Number(id)));
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <section className='mt-3 w-full'>
      <ScrollProgressBar />
      <PostHeader {...post} />

      <div className='flex gap-16'>
        <div className='w-full'>
          <PostContent html={post.content} className='xl:min-w-[680px]' />
          <PostNavigation navigation={navigation} />
          <Bio className='mb-12 border-b pb-8' />
        </div>

        <PostTableOfContents className='hidden min-[1301px]:block' content={post.content} />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({ id: String(post.id) }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
