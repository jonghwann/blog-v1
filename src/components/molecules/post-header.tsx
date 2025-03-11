import { cn } from '@/lib/utils';

import { Post } from '@/types/post';

interface PostHeaderProps {
  className?: string;
  post: Post;
}

export default function PostHeader({ className, post }: PostHeaderProps) {
  const { categoryPublicName, title, createdAt, readingMinutes } = post;

  return (
    <div className={cn('flex flex-col items-center gap-6 text-secondary-foreground', className)}>
      <span className="text-sm font-semibold sm:text-base">{categoryPublicName}</span>
      <h1 className="text-center text-[32px] font-bold text-foreground sm:text-[44px]">{title}</h1>

      <div className="flex items-center gap-2 text-sm font-normal">
        <time>{createdAt}</time>
        <span>·</span>
        <span>{readingMinutes} min read</span>
      </div>
    </div>
  );
}
