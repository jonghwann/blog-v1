import { getPosts, getCategories } from '@/lib/post';

import CategoryTabs from '@/components/molecules/category-tabs';
import CategorySelect from '@/components/atoms/category-select';
import PostCard from '@/components/molecules/post-card';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  const [categories, posts] = await Promise.all([getCategories(), getPosts(category)]);

  return (
    <div className="w-full">
      <CategoryTabs className="mb-10 hidden sm:block" defaultValue={category} categories={categories} baseUrl={'/posts'} />

      <CategorySelect classNames={{ trigger: 'mb-10 sm:hidden' }} defaultValue={category} categories={categories} baseUrl={'/posts'} />

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          return <PostCard key={post.url} post={post} />;
        })}

        {posts.map((post) => {
          return <PostCard key={post.url} post={post} />;
        })}

        {posts.map((post) => {
          return <PostCard key={post.url} post={post} />;
        })}

        {posts.map((post) => {
          return <PostCard key={post.url} post={post} />;
        })}
      </ul>
    </div>
  );
}
