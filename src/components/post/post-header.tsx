import { formatDate } from '@/lib/date';
import type { Tag } from '@/types/tag';
import EditButton from '../common/edit-button';
import TagGroup from '../common/tag-group';

interface PostHeaderProps {
  id: number;
  title: string;
  tags: Tag[];
  readingTime: number;
  createdAt: Date;
}

export default function PostHeader({ id, title, tags, readingTime, createdAt }: PostHeaderProps) {
  const formattedDate = formatDate(createdAt);

  return (
    <div className='mb-12 border-b pb-6'>
      <h1 className='mb-[26px] font-bold text-[44px] leading-[1.2]'>{title}</h1>

      <div className='mb-8 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-tertiary-foreground'>
          <time>{formattedDate}</time>
          <span>·</span>
          <span>{readingTime} min read</span>
        </div>

        <EditButton id={id} />
      </div>

      <TagGroup tags={tags} />
    </div>
  );
}
