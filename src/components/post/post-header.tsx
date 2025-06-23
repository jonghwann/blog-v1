import { format } from 'date-fns';

import EditButton from '../common/edit-button';
import Tag from '../common/tag';

interface PostHeaderProps {
  id: number;
  createdAt: Date;
  title: string;
  tags: string;
}

export default function PostHeader({ id, createdAt, title, tags }: PostHeaderProps) {
  const formattedDate = format(new Date(createdAt), 'EEEE, MMMM do yyyy');
  const tagList = tags.split(',');

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <time className="text-secondary-foreground text-sm">{formattedDate}</time>
        <EditButton id={id} />
      </div>

      <h1 className="mb-12 text-5xl font-bold">{title}</h1>

      <div className="mb-8 flex gap-2 border-b pb-4">
        {tagList.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
