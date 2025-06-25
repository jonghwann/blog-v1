import { notFound } from 'next/navigation';

import { findPostById, findPosts } from '@/db/posts';

import BackButton from '@/components/common/back-button';
import PostHeader from '@/components/post/post-header';
import PostContent from '@/components/post/post-content';
import PostTableOfContents from '@/components/post/post-table-of-contents';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await findPostById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-(--breakpoint-md) px-4">
      <BackButton />
      <PostHeader {...post} />

      <div className="flex gap-16">
        <PostContent className="w-full xl:min-w-[736px]" html={post.content} />
        <PostTableOfContents className="hidden xl:block" content={post.content} />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = await findPosts();
  return posts.map((post) => ({ id: String(post.id) }));
}
