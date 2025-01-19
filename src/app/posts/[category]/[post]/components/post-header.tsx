import { Post } from '@/types/post';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return <div>{post.title}</div>;
}
