import { format } from 'date-fns';

import Tag from '../common/tag';

interface PostHeaderProps {
  createdAt: Date;
  title: string;
  tags: string;
}

export default function PostHeader({ createdAt, title, tags }: PostHeaderProps) {
  const formattedDate = format(new Date(createdAt), 'EEEE, MMMM do yyyy');
  const tagList = tags.split(',');

  return (
    <div>
      <time className="text-secondary-foreground mb-6 block text-sm">{formattedDate}</time>
      <h1 className="mb-12 text-5xl font-bold">{title}</h1>

      <div className="mb-8 flex gap-2 border-b pb-4">
        {tagList.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
