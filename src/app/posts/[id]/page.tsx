import { getPost } from '@/api/post/[id]/api';

import PostContent from '@/components/post/post-content';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    return <div>Not found</div>;
  }

  return (
    <section className="mx-auto w-full max-w-(--breakpoint-md) px-4">
      <div className="flex gap-16">
        <PostContent html={post.content} />
      </div>
    </section>
  );
}
