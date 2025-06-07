'use client';

import { useState } from 'react';

import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import AutosizeInput from '../common/autosize-input';

interface EditorTagsProps {
  className?: string;
}

export default function EditorTags({ className }: EditorTagsProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      const newTag = input.trim();

      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setInput('');
      }
    }

    if (e.key === 'Backspace' && !input) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className={cn('text-secondary-foreground flex flex-wrap gap-3 text-sm', className)}>
      {tags.map((tag) => (
        <div key={tag} className="flex items-center gap-1">
          <div>
            <span># </span>
            <span>{tag}</span>
          </div>

          <button className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
            <XIcon className="size-3" />
          </button>
        </div>
      ))}

      <div>
        <span># </span>
        <AutosizeInput
          className="placeholder:text-secondary-foreground focus-visible:outline-none"
          placeholder="태그입력"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <input type="hidden" name="tags" value={tags.join(',')} />
    </div>
  );
}
