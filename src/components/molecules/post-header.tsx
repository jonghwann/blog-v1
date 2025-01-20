import { cn } from '@/lib/utils';

import { Post } from '@/types/post';

interface PostHeaderProps {
  className?: string;
  post: Post;
}

export default function PostHeader({ className, post }: PostHeaderProps) {
  const { category, title, createdAt, readingMinutes } = post;

  return (
    <div className={cn('flex flex-col items-center gap-5 font-bold', className)}>
      <span className="text-base">{category}</span>
      <h1 className="text-center text-[30px]">{title}</h1>

      <div className="flex items-center gap-2">
        <time className="text-sm font-normal text-secondary-foreground">{createdAt}</time>
        <span className="text-sm font-normal text-secondary-foreground">·</span>
        <span className="text-sm font-normal text-secondary-foreground">{readingMinutes} min read</span>
      </div>
    </div>
  );
}
