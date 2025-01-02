import { getAllPosts, getCategories } from '@/lib/post';

import CategoryTabs from '@/components/molecules/category-tabs';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  const [categories, posts] = await Promise.all([getCategories(), getAllPosts(category)]);

  return (
    <div className="w-full">
      <CategoryTabs defaultValue={category} categories={categories} baseUrl={'/posts'} />

      <ul>
        {posts.map((post) => {
          const { url, title } = post;
          return <li key={url}>{title}</li>;
        })}
      </ul>
    </div>
  );
}
