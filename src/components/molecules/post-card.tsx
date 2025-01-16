import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post: { thumbnail, title, category, createdAt, readingMinutes, postUrl } }: PostCardProps) {
  return (
    <li>
      <article className="group overflow-hidden rounded-[20px] shadow-[0_15px_30px_0_rgba(0,0,0,0.05)] will-change-transform">
        <Link href={postUrl}>
          <figure className="relative h-[210px] overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill
              priority
              className="object-cover duration-300 ease-in-out group-hover:scale-[1.08]"
            />
          </figure>

          <div className="flex h-[170px] flex-col justify-between bg-white p-[26px] dark:bg-[#1a1b1e]">
            <div className="flex flex-col gap-[6px]">
              <div className="text-xs font-medium">{category}</div>
              <h2 className="text-xl font-bold">{title}</h2>
            </div>

            <div className="flex items-center justify-between text-xs text-secondary-foreground">
              <time className="flex items-center gap-1">{createdAt}</time>
              <span>{readingMinutes}분</span>
            </div>
          </div>
        </Link>
      </article>
    </li>
  );
}
