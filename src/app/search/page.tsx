import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getSearchPosts } from '@/api/search/api';
import PostSearch from '@/components/post/post-search';

interface SearchPageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const search = q ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['search', search], queryFn: () => getSearchPosts(search) });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostSearch initialSearch={search} />
    </HydrationBoundary>
  );
}
