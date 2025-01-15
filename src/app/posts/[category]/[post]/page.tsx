import { getPostDetail, getMdxPaths, parsePostInfo } from '@/lib/post';

import Post from './components/post';

interface Props {
  params: Promise<{ category: string; post: string }>;
}

export default async function PostPage({ params }: Props) {
  const { category, post } = await params;

  const postData = await getPostDetail(category, post);

  return <Post post={postData} />;
}

export async function generateStaticParams(): Promise<{ category: string; post: string }[]> {
  const mdxPaths = await getMdxPaths('All');

  return mdxPaths.map(parsePostInfo).map(({ categorySlug, postSlug }) => ({
    category: categorySlug,
    post: postSlug,
  }));
}
