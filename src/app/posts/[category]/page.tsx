import { getCategoryList, getPostList } from '@/lib/post';

import CategoryTabs from '@/components/molecules/category-tabs';
import CategorySelect from '@/components/molecules/category-select';
import PostCard from '@/components/molecules/post-card';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const [categoryList, postList] = await Promise.all([getCategoryList(), getPostList(category)]);

  return (
    <section className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex gap-10">
        <div className="flex-[2]">
          <div className="mb-10">
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
        </div>

        <aside className="flex-1 border-l">123123</aside>
      </div>
    </section>
  );
}
