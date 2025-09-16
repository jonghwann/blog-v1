import { FiSearch } from 'react-icons/fi';
import { getPosts } from '@/api/posts/api';
import Input from '@/components/common/input';
import Title from '@/components/common/title';
import PostList from '@/components/post/post-list';
import type { Post } from '@/types/post';

interface SearchPageProps {
  searchParams: Promise<{ query: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;

  let posts: Post[] = [];

  try {
    posts = await getPosts();
  } catch (error) {
    console.error(error);
    posts = [];
  }

  return (
    <div>
      <Title>There are {posts.length} posts.</Title>
      <Input placeholder='Search' icon={<FiSearch />} classNames={{ container: 'mb-[70px]', input: 'h-[46px] pl-10', icon: 'left-3' }} />
      <PostList posts={posts} />
    </div>
  );
}
