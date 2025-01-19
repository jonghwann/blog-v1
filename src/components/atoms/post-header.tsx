import { cn } from '@/lib/utils';

import { Post } from '@/types/post';

interface PostHeaderProps {
  className?: string;
  post: Post;
}

export default function PostHeader({ className, post }: PostHeaderProps) {
  return (
    <div className={cn('flex flex-col items-center gap-5 font-bold', className)}>
      <span className="text-base">{post.category}</span>
      <h1 className="text-center text-[30px]">{post.title}</h1>
      <time className="text-sm font-normal text-secondary-foreground">{post.createdAt}</time>
    </div>
  );
}
