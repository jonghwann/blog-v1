import Link from 'next/link';
import Image from 'next/image';

import { CalendarDays, Clock3 } from 'lucide-react';

import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post: { thumbnail, category, title, date, readingMinutes, url } }: PostCardProps) {
  return (
    <Link href={url}>
      <li className="flex h-full flex-col gap-3 overflow-hidden rounded-md border shadow-md transition hover:shadow-xl dark:border-slate-700 dark:hover:border-white">
        <div className="relative aspect-video w-full rounded-t-md border-b">
          <Image src={thumbnail} alt={title} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" fill priority />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 pt-1">
          <div>
            <div className="text-sm font-medium text-pink-600 lg:text-base">{category}</div>
            <h2 className="mb-3 mt-1 text-lg font-bold sm:text-xl md:text-lg">{title}</h2>
          </div>

          <div className="flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              <span>{readingMinutes}분</span>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}
