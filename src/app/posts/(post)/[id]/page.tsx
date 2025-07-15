import { notFound } from 'next/navigation';

import BackButton from '@/components/common/back-button';
import ScrollProgressBar from '@/components/common/scroll-progress-bar';
import PostContent from '@/components/post/post-content';
import PostHeader from '@/components/post/post-header';
import PostTableOfContents from '@/components/post/post-table-of-contents';
import { findPostById, findPosts } from '@/db/posts';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  let post = null;

  try {
    post = await findPostById(Number(id));
  } catch (error) {
    console.error('Error in PostPage:', error);
  }

  if (!post) {
    notFound();
  }

  console.log(post);

  return (
    <div>
      <ScrollProgressBar />
      <BackButton />
      <PostHeader {...post} />

      <div className="flex gap-16">
        <PostContent className="w-full xl:min-w-[736px]" html={post.content} />
        <PostTableOfContents className="hidden xl:block" content={post.content} />
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
