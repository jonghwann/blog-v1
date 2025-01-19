import { getPostDetail, getMdxPaths, parsePostInfo } from '@/lib/post';

import PostHeader from '../../../../components/atoms/post-header';
import Post from './components/post';

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
          <Post post={postData} />
        </article>

        <aside className="block w-[240px] shrink-0">
          <div className="sticky top-[80px]">
            <nav>
              <h2 className="mb-4 font-semibold">목차</h2>
              <ul>...</ul>
            </nav>

            <div>
              <h2 className="mb-4 font-semibold">태그</h2>
              <ul>...</ul>
            </div>
          </div>
        </aside>
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
