import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { Tag } from '@/types/tag';
import TagGroup from '../common/tag-group';

interface PostItemProps {
  id: number;
  title: string;
  createdAt: Date;
  summary: string;
  tags: Tag[];
}

export default function PostItem({ id, title, createdAt, summary, tags }: PostItemProps) {
  return (
    <article>
      <Link href={`/posts/${id}`}>
        <h2 className='mb-6 font-bold text-[32px] leading-[1.2]'>{title}</h2>
      </Link>

      <time className='mb-4 block text-quaternary-foreground text-sm leading-[1]'>{formatDate(createdAt)}</time>
      <p className='mb-8 text-[15px] leading-[1.7]'>{summary}</p>

      <TagGroup tags={tags} />
    </article>
  );
}
