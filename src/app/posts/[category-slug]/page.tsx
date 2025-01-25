import { getCategoryList, getPostList } from '@/lib/post';

import CategoryTabs from '@/components/molecules/category-tabs';
import CategorySelect from '@/components/molecules/category-select';
import PostListItem from '@/components/molecules/post-list-item';
import TagGroup from '@/components/molecules/tag-group';

export interface CategoryPageProps {
  params: Promise<{ 'category-slug': string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { 'category-slug': categorySlug } = await params;

  const [categoryList, postList] = await Promise.all([getCategoryList(), getPostList(categorySlug)]);

  return (
    <section className="mx-auto flex w-full max-w-screen-xl gap-10 px-4">
      <div className="flex-[2]">
        <div className="mb-[10px]">
          <CategoryTabs className="hidden sm:block" defaultValue={categorySlug} categoryList={categoryList} baseUrl={'/posts'} />
          <CategorySelect classNames={{ trigger: 'sm:hidden' }} defaultValue={categorySlug} categoryList={categoryList} baseUrl={'/posts'} />
        </div>

        <ul>
          {postList.map((post) => {
            return (
              <li key={post.postUrl}>
                <PostListItem post={post} />
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="hidden flex-1 border-l pl-[16px] md:block">
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-secondary-foreground">태그</h2>
          <TagGroup tags={categoryList} activeTag={categorySlug} baseUrl={'/posts'} />
        </section>
      </aside>
    </section>
  );
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const categoryList = await getCategoryList();
  const staticParams = categoryList.map(({ categorySlug }) => ({ 'category-slug': categorySlug }));
  return staticParams;
}
