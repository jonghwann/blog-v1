import { formatDate } from '@/lib/utils';

import EditButton from '../common/edit-button';
import TagList from '../common/tag-list';

interface PostHeaderProps {
  id: number;
  title: string;
  tags: string;
  readingTime: number;
  createdAt: Date;
}

export default function PostHeader({ id, title, tags, readingTime, createdAt }: PostHeaderProps) {
  const formattedDate = formatDate(createdAt);

  return (
    <div>
      <h1 className="mb-7 text-5xl leading-[1.2] font-bold">{title}</h1>

      <div className="mb-8 flex items-center justify-between">
        <div className="text-secondary-foreground flex items-center gap-2 text-sm">
          <time>{formattedDate}</time>
          <span>·</span>
          <span>{readingTime} min read</span>
        </div>

        <EditButton id={id} />
      </div>

      <div className="mb-12 border-b pb-6">
        <TagList tags={tags.split(',')} />
      </div>
    </div>
  );
}
