'use client';
import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { FiSearch } from 'react-icons/fi';
import { getSearchPosts } from '@/api/search/api';
import Input from '../common/input';
import Title from '../common/title';
import PostList from './post-list';

interface PostSearchProps {
  initialSearch: string;
}

export default function PostSearch({ initialSearch }: PostSearchProps) {
  const [search, setSearch] = useQueryState('q', { defaultValue: initialSearch });

  const { data: posts = [] } = useQuery({ queryKey: ['search', search], queryFn: () => getSearchPosts(search) });

  return (
    <section className='w-full'>
      <Title>There are {posts.length} posts.</Title>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search'
        icon={<FiSearch />}
        classNames={{ container: 'mb-[70px]', input: 'h-[46px] pl-10', icon: 'left-3' }}
      />

      <PostList posts={posts} />
    </section>
  );
}
