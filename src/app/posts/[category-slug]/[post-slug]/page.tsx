import { getPostDetail, getMdxPathList, parsePostInfo, getTableOfContents } from '@/lib/post';

import PostHeader from '../../../../components/molecules/post-header';
import PostContent from '../../../../components/molecules/post-content';
import PostTableOfContents from '@/components/molecules/post-table-of-contents';
import Giscus from '@/components/molecules/giscus';

export interface PostPageProps {
  params: Promise<{ 'category-slug': string; 'post-slug': string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { 'category-slug': categorySlug, 'post-slug': postSlug } = await params;

  const post = await getPostDetail(categorySlug, postSlug);
  const tableOfContents = getTableOfContents(post.content);

  return (
    <section className="mx-auto w-full max-w-screen-md px-4">
      <PostHeader className="mb-12" post={post} />

      <div className="flex gap-16">
        <PostContent className="mb-12 w-full border-b pb-12" post={post} />
        <PostTableOfContents className="hidden xl:block" tableOfContents={tableOfContents} />
      </div>

      <Giscus />
    </section>
  );
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ 'category-slug': string; 'post-slug': string }[]> {
  const mdxPaths = await getMdxPathList('All');

  return mdxPaths.map(parsePostInfo).map(({ categorySlug, postSlug }) => ({
    'category-slug': categorySlug,
    'post-slug': postSlug,
  }));
}
