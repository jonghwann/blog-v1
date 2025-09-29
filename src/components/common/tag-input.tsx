'use client';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { type Control, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import AutosizeInput from './autosize-input';

interface TagInputProps {
  control: Control<any>;
  name: string;
  defaultValue?: string[];
  className?: string;
}

export default function TagInput({ control, name, defaultValue, className }: TagInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? []}
      render={({ field: { value, onChange } }) => <TagInputField value={value} onChange={onChange} className={className} />}
    />
  );
}

interface TagInputFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

function TagInputField({ value: tags, onChange, className }: TagInputFieldProps) {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      const newTag = input.trim();

      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
        setInput('');
      }
    }

    if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className={cn('flex flex-wrap gap-3 font-nanum-round text-secondary-foreground', className)}>
      {tags &&
        tags.length > 0 &&
        tags.map((tag) => (
          <div key={tag} className='flex items-center gap-1'>
            <span aria-hidden='true'>#</span>
            <span>{tag}</span>

            <button className='cursor-pointer' type='button' onClick={() => handleRemoveTag(tag)} aria-label={`${tag} 태그 삭제`}>
              <XIcon className='size-4' aria-hidden='true' />
            </button>
          </div>
        ))}

      <div className='flex items-center gap-1'>
        <span aria-hidden='true'>#</span>

        <AutosizeInput
          value={input}
          placeholder='Add a tag'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='placeholder:text-secondary-foreground focus-visible:outline-none'
          aria-label='새 태그 입력'
        />
      </div>
    </div>
  );
}
