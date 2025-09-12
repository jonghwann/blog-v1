import type { Post } from '@/types/post';
import PostItem from './post-item';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className='mb-8 border-b pb-12 last:mb-0 last:border-none last:pb-0'>
          <PostItem {...post} />
        </li>
      ))}
    </ul>
  );
}
