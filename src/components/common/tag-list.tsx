'use client';

import { createTagHref } from '@/lib/post';

import Tag from './tag';

interface TagListProps {
  tags: string[];
  selectedTags: string[];
}

export default function TagList({ tags, selectedTags }: TagListProps) {
  return (
    <nav>
      <ul className="flex flex-wrap gap-[8px_6px]">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag
              className={
                selectedTags.includes(tag) ? 'bg-accent text-accent-foreground hover:bg-accent-background' : ''
              }
              href={createTagHref(tag, selectedTags)}
            >
              {tag}
            </Tag>
          </li>
        ))}
      </ul>
    </nav>
  );
}
