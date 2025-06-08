import { getPost } from '@/api/post/[id]/api';

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
        {/* <PostContent className="w-full xl:min-w-[736px]" post={postDetail} /> */}
        {/* <PostTableOfContents className="hidden xl:block" tableOfContents={tableOfContents} /> */}
      </div>

      {/* <Giscus className="mt-12 min-h-[372px] border-t pt-10" /> */}
    </section>
  );
}
