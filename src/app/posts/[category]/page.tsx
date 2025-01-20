import { getCategoryList, getPostList } from '@/lib/post';

import CategoryTabs from '@/components/molecules/category-tabs';
import CategorySelect from '@/components/molecules/category-select';
import PostListItem from '@/components/molecules/post-list-item';
import TagGroup from '@/components/molecules/tag-group';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const [categoryList, postList] = await Promise.all([getCategoryList(), getPostList(category)]);

  return (
    <section className="mx-auto flex w-full max-w-screen-xl gap-10 px-4">
      <div className="flex-[2]">
        <div className="mb-[10px]">
          <CategoryTabs className="hidden sm:block" defaultValue={category} categoryList={categoryList} baseUrl={'/posts'} />
          <CategorySelect classNames={{ trigger: 'sm:hidden' }} defaultValue={category} categoryList={categoryList} baseUrl={'/posts'} />
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
          <TagGroup tags={categoryList} activeTag={category} baseUrl={'/posts'} />
        </section>
      </aside>
    </section>
  );
}
