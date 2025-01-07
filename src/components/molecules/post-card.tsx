import Link from 'next/link';
import Image from 'next/image';

import { CalendarDays, Clock3 } from 'lucide-react';

import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post: { thumbnail, category, title, date, readingMinutes, url } }: PostCardProps) {
  return (
    <li className="group overflow-hidden rounded-2xl shadow-[0_9px_10px_-2px_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out hover:translate-y-[-5px] hover:shadow-[0_17px_19px_-2px_rgba(0,0,0,0.2)]">
      <Link href={url}>
        <article className="flex flex-col">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill
              priority
              className="object-cover transition-all duration-500 ease-in-out group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <div className="text-sm font-medium text-pink-600 lg:text-base">{category}</div>
              <h2 className="mb-3 mt-1 line-clamp-2 text-lg font-bold sm:text-xl md:text-lg">{title}</h2>
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
        </article>
      </Link>
    </li>
  );
}
