import Link from 'next/link';
import Image from 'next/image';

import { CalendarDays, Clock3 } from 'lucide-react';

import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post: { thumbnail, category, title, excerpt, date, readingMinutes, url } }: PostCardProps) {
  return (
    <li>
      <article className="group overflow-hidden rounded-2xl shadow-[0_9px_10px_-2px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-500 ease-in-out will-change-transform hover:translate-y-[-5px] hover:shadow-[0_17px_19px_-2px_rgba(0,0,0,0.2)]">
        <Link href={url}>
          <figure className="relative aspect-video">
            <Image
              src={thumbnail}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill
              priority
              className="object-cover duration-500 ease-in-out group-hover:scale-[1.03]"
            />
          </figure>

          <div className="flex h-[200px] flex-col justify-between bg-white p-5 text-secondary-foreground dark:bg-[#1a1f24]">
            <div className="flex flex-col gap-2">
              <div className="w-fit rounded-full bg-accent px-2 py-[3px] text-xs text-white">{category}</div>
              <h2 className="text-base font-medium text-foreground">{title}</h2>

              <p className="line-clamp-2 text-xs">{excerpt}</p>
            </div>

            <div className="flex items-center justify-between text-xs">
              <time className="flex items-center gap-1">
                <CalendarDays className="mb-0.5 h-3.5 w-3.5" />
                <span>{date}</span>
              </time>

              <div className="flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                <span>{readingMinutes}분</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </li>
  );
}
