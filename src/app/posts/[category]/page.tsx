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
    <section className="mx-auto w-full max-w-[1024px] px-4">
      <div className="mb-10 mt-[56px]">
        <CategoryTabs className="hidden sm:block" defaultValue={category} categoryList={categoryList} baseUrl={'/posts'} />
        <CategorySelect classNames={{ trigger: 'sm:hidden' }} defaultValue={category} categoryList={categoryList} baseUrl={'/posts'} />
      </div>

      <ul className="grid grid-cols-1 gap-[50px_30px] md:grid-cols-2 lg:grid-cols-3">
        {postList.map((post) => {
          return (
            <li key={post.postUrl}>
              <PostCard post={post} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
