import { getPost } from '@/api/post/[id]/api';

import BackButton from '@/components/common/back-button';
import PostContent from '@/components/post/post-content';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await getPost(id);

  return (
    <section className="mx-auto w-full max-w-(--breakpoint-md) px-4">
      <BackButton />

      <div className="flex gap-16">
        <PostContent className="w-full xl:min-w-[736px]" html={post.content} />
      </div>
    </section>
  );
}
