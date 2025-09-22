import { getPosts } from '@/api/posts/api';
import { getTags } from '@/api/tags/api';
import TagGroup from '@/components/common/tag-group';
import Title from '@/components/common/title';
import PostList from '@/components/post/post-list';
import type { Post } from '@/types/post';
import type { Tag } from '@/types/tag';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params;
  const tag = encodedTag && decodeURIComponent(encodedTag);

  let posts: Post[] = [];
  let tags: Tag[] = [];

  try {
    [posts, tags] = await Promise.all([getPosts(tag), getTags()]);
  } catch (error) {
    console.error(error);
    posts = [];
    tags = [];
  }

  return (
    <section>
      <Title>{tag ? `There are ${posts.length} posts that match #${tag}.` : `There are ${tags.length} tags.`}</Title>
      <TagGroup tags={tags} tag={tag} className='mb-14' />
      <PostList posts={posts} />
    </section>
  );
}
