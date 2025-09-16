import TagGroup from '@/components/common/tag-group';
import Title from '@/components/common/title';
import PostList from '@/components/post/post-list';
import { getPostsAndTags } from '@/lib/data';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params;
  const tag = encodedTag && decodeURIComponent(encodedTag);

  const { posts, tags } = await getPostsAndTags(tag);

  return (
    <section>
      <Title>{tag ? `There are ${posts.length} posts that match #${tag}.` : `There are ${tags.length} tags.`}</Title>
      <TagGroup tags={tags} tag={tag} className='mb-14' />
      <PostList posts={posts} />
    </section>
  );
}
