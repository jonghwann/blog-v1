import { getPostDetail, getMdxPaths, parsePostInfo } from '@/lib/post';

import PostHeader from '../../../../components/atoms/post-header';
import PostContent from '../../../../components/molecules/post-content';
import PostAside from '@/components/atoms/post-aside';

interface Props {
  params: Promise<{ category: string; post: string }>;
}

export default async function PostPage({ params }: Props) {
  const { category, post } = await params;
  const postData = await getPostDetail(category, post);

  return (
    <section className="mx-auto w-full max-w-[768px] px-4">
      <PostHeader className="my-[56px]" post={postData} />

      <div className="flex gap-8">
        <article className="w-full">
          <PostContent post={postData} />
        </article>

        <PostAside />
      </div>
    </section>
  );
}

export async function generateStaticParams(): Promise<{ category: string; post: string }[]> {
  const mdxPaths = await getMdxPaths('All');

  return mdxPaths.map(parsePostInfo).map(({ categorySlug, postSlug }) => ({
    category: categorySlug,
    post: postSlug,
  }));
}
