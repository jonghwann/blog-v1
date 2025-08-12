import { notFound } from 'next/navigation';

import ScrollProgressBar from '@/components/common/scroll-progress-bar';
import PostContent from '@/components/post/post-content';
import PostHeader from '@/components/post/post-header';
import PostNavigation from '@/components/post/post-navigation';
import PostTableOfContents from '@/components/post/post-table-of-contents';
import { findPostByIdWithNavigation, findPosts } from '@/db/posts';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  let post = null;
  let navigation = null;

  try {
    ({ post, navigation } = await findPostByIdWithNavigation(Number(id)));
  } catch (error) {
    console.error('Error in PostPage:', error);
  }

  if (!post || !navigation) {
    notFound();
  }

  return (
    <div>
      <ScrollProgressBar />
      <PostHeader {...post} />

      <div className='flex gap-16'>
        <div className='w-full'>
          <PostContent className='xl:min-w-[736px]' html={post.content} />
          <PostNavigation navigation={navigation} />
        </div>

        <PostTableOfContents className='hidden xl:block' content={post.content} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const posts = await findPosts();
    return posts.map((post) => ({ id: String(post.id) }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}
