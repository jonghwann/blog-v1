import { type Post } from '@prisma/client';

import FabLink from '@/components/common/fab-link';
import TagList from '@/components/common/tag-list';
import PostList from '@/components/post/post-list';
import { findPosts, findTags } from '@/db/posts';
import { parseTags } from '@/lib/post';

interface PostsPageProps {
  searchParams: Promise<{ tag: string | string[] }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { tag } = await searchParams;
  const selectedTags = tag ? (Array.isArray(tag) ? tag : [tag]) : [];

  let posts: Post[] = [];
  let tags: string[] = [];

  try {
    [posts, tags] = await Promise.all([findPosts(tag), findTags().then(parseTags)]);
  } catch (error) {
    console.error('Error in PostsPage:', error);
  }

  return (
    <section className="mx-auto flex w-full max-w-(--breakpoint-xl) lg:gap-10">
      <div className="relative flex-2 px-4">
        <PostList posts={posts} />
        <FabLink href="/posts/write" />
      </div>

      <aside className="hidden flex-1 border-l px-4 md:block">
        <section className="flex flex-col gap-3">
          <h2 className="text-secondary-foreground text-sm font-medium">Tags</h2>

          <nav>
            <TagList tags={tags} selectedTags={selectedTags} />
          </nav>
        </section>
      </aside>
    </section>
  );
}
