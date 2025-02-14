import { getPostDetail, getMdxPathList, parsePostInfo, getTableOfContents } from '@/lib/post';

import PostHeader from '../../../../components/molecules/post-header';
import PostContent from '../../../../components/molecules/post-content';
import PostTableOfContents from '@/components/molecules/post-table-of-contents';
import Giscus from '@/components/molecules/giscus';

export interface PostPageProps {
  params: Promise<{ category: string; post: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, post } = await params;

  const postDetail = await getPostDetail(category, post);
  const tableOfContents = getTableOfContents(postDetail.content);

  return (
    <section className="mx-auto w-full max-w-screen-md px-4">
      <PostHeader className="mb-6" post={postDetail} />

      <div className="flex gap-16">
        <PostContent className="w-full xl:min-w-[736px]" post={postDetail} />
        <PostTableOfContents className="hidden xl:block" tableOfContents={tableOfContents} />
      </div>

      <Giscus />
    </section>
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const mdxPaths = await getMdxPathList('all');
  return mdxPaths.map(parsePostInfo).map(({ category, post }) => ({
    category,
    post,
  }));
}
