import { getCategoryList, getPostList } from '@/lib/post';

import CategoryTabs from '@/components/atoms/category-tabs';
import CategorySelect from '@/components/atoms/category-select';
import PostCard from '@/components/molecules/post-card';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const [categoryList, postList] = await Promise.all([getCategoryList(), getPostList(category)]);

  return (
    <div className="w-full">
      <CategoryTabs className="mb-10 hidden sm:block" defaultValue={category} categoryList={categoryList} baseUrl={'/posts'} />

      <CategorySelect classNames={{ trigger: 'mb-10 sm:hidden' }} defaultValue={category} categoryList={categoryList} baseUrl={'/posts'} />

      <ul className="grid grid-cols-1 gap-[50px_30px] md:grid-cols-2 lg:grid-cols-3">
        {postList.map((post) => {
          return (
            <li key={post.postUrl}>
              <PostCard post={post} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
