import { getPostDetail, getMdxPathList, parsePostInfo, getTableOfContents } from '@/lib/post';

import PostHeader from '../../../../components/molecules/post-header';
import PostContent from '../../../../components/molecules/post-content';
import PostTableOfContents from '@/components/molecules/post-table-of-contents';

interface Props {
  params: Promise<{ category: string; post: string }>;
}

export default async function PostPage({ params }: Props) {
  const { category, post } = await params;

  const postDetail = await getPostDetail(category, post);
  const tableOfContents = getTableOfContents(postDetail.content);

  return (
    <section className="mx-auto w-full max-w-[768px] px-4">
      <PostHeader className="my-[56px]" post={postDetail} />

      <div className="flex gap-16">
        <article className="w-full">
          <PostContent post={postDetail} />
        </article>

        <PostTableOfContents tableOfContents={tableOfContents} />
      </div>
    </section>
  );
}

export async function generateStaticParams(): Promise<{ category: string; post: string }[]> {
  const mdxPaths = await getMdxPathList('All');

  return mdxPaths.map(parsePostInfo).map(({ categorySlug, postSlug }) => ({
    category: categorySlug,
    post: postSlug,
  }));
}
