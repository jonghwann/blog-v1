'use client';

import { X } from 'lucide-react';

import { createTagHref } from '@/lib/post';

import Tag from './tag';

interface TagListProps {
  tags: string[];
  selectedTags?: string[];
}

export default function TagList({ tags, selectedTags }: TagListProps) {
  return (
    <ul className="flex flex-wrap items-center gap-[8px_6px]">
      {tags.map((tag) => {
        const isSelected = selectedTags?.includes(tag);
        return (
          <li key={tag}>
            <Tag
              className={isSelected ? 'bg-accent text-accent-foreground hover:bg-accent-background gap-1' : ''}
              href={createTagHref(tag, selectedTags)}
            >
              {tag}
              {isSelected && <X className="size-4 stroke-[1.5px]" />}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}
