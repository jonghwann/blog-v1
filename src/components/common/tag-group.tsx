import { cn } from '@/lib/utils';
import type { Tag as TagType } from '@/types/tag';
import Tag from './tag';

interface TagGroupProps {
  tags: TagType[];
  tag?: string;
  className?: string;
}

export default function TagGroup({ tags, tag, className }: TagGroupProps) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {tags.map(({ name, count }) => (
        <li key={name}>
          <Tag href={tag === name ? '/tags' : `/tags/${name}`} isActive={tag === name}>
            {name} {count && `(${count})`}
          </Tag>
        </li>
      ))}
    </ul>
  );
}
