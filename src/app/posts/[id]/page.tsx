import { findPostById, findPosts } from '@/lib/db/posts';

import BackButton from '@/components/common/back-button';
import PostContent from '@/components/post/post-content';
import PostTableOfContents from '@/components/post/post-table-of-contents';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await findPostById(Number(id));

  return (
    <section className="mx-auto w-full max-w-(--breakpoint-md) px-4">
      <BackButton />

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
