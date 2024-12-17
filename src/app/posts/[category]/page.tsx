import { getAllPosts, getCategories } from '@/lib/post';

import CategoriesTabs from '@/components/molecules/categories-tabs';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  const categories = await getCategories();
  const posts = await getAllPosts(category);

  // 카테고리 값을 기반으로 링크 생성
  const handleCategoryLink = (category: string) => {
    if (category === 'all') {
      return '/posts';
    } else {
      return `/posts/${category}`;
    }
  };

  return (
    <div>
      <CategoriesTabs defaultValue={category} categories={categories} buildHref={handleCategoryLink} />

      <ul>
        {posts.map((post) => {
          const { url, title } = post;
          return <li key={url}>{title}</li>;
        })}
      </ul>
    </div>
  );
}
