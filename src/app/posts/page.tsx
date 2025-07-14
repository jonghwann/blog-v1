import { type Post } from '@prisma/client';

import FabLink from '@/components/common/fab-link';
import { findPosts } from '@/db/posts';

export default async function PostsPage() {
  let posts: Post[] = [];

  try {
    posts = await findPosts();
  } catch (error) {
    posts = [];
    console.error('Error in PostsPage:', error);
  }

  console.log(posts);

  return (
    <section className="mx-auto flex w-full max-w-(--breakpoint-xl) lg:gap-10">
      <div className="relative flex-2 px-4">
        <div className="mb-[10px]"></div>

        <ul></ul>
        <FabLink href="/posts/write" />
      </div>

      <aside className="hidden flex-1 border-l px-4 md:block">
        <section className="flex flex-col gap-3">
          <h2 className="text-secondary-foreground text-sm font-medium">Tags</h2>
        </section>
      </aside>
    </section>
  );
}
