import { getPostDetail, getPostPaths, parsePostAbstract } from '@/lib/post';

import Post from './components/post';

interface Props {
  params: Promise<{ category: string; post: string }>;
}

export default async function Page({ params }: Props) {
  const { category, post } = await params;

  const postData = await getPostDetail(category, post);

  return <Post post={postData} />;
}

export function generateStaticParams() {
  const postPaths: string[] = getPostPaths('All');
  const paramList = postPaths.map((path) => parsePostAbstract(path)).map((item) => ({ category: item.categoryPath, post: item.slug }));
  return paramList;
}
