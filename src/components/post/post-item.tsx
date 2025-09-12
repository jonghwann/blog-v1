import Link from 'next/link';

import { formatDate } from '@/lib/utils';

interface PostItemProps {
  id: number;
  title: string;
  summary: string;
  readingTime: number;
  createdAt: Date;
}

export default function PostItem({ id, title, summary, readingTime, createdAt }: PostItemProps) {
  return (
    <article>
      <Link className='group' href={`/posts/${id}`}>
        <h2 className='mb-6 font-bold text-[32px] leading-[1.3]'>{title}</h2>
        <time className='mb-4 block text-[14.4px] leading-[1]'>{formatDate(createdAt)}</time>
        <p className='mb-8 text-[15px] leading-[1.7]'>{summary}</p>

        {/* <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <h2 className='line-clamp-1 font-semibold text-base text-foreground transition-colors duration-200 ease-in-out group-hover:text-accent-foreground sm:text-xl'>
              {title}
            </h2>
            <p className='line-clamp-2 text-secondary-foreground text-xs sm:text-sm'>{summary}</p>
          </div>

          <div className='flex items-center gap-2 text-secondary-foreground text-xs'>
            <time>{formatDate(createdAt)}</time>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
        </div> */}
      </Link>
    </article>
  );
}
