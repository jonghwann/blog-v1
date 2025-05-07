'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import { CategoryItem } from '@/types/post';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface CategorySelectProps {
  classNames?: {
    trigger?: string;
    item?: string;
  };
  categoryList: CategoryItem[];
  defaultValue: string;
  baseUrl: string;
}

export default function CategorySelect({ classNames = {}, categoryList, defaultValue, baseUrl }: CategorySelectProps) {
  const router = useRouter();

  return (
    <Select defaultValue={defaultValue} onValueChange={(value) => router.push(value === 'all' ? baseUrl : `${baseUrl}/${value}`)}>
      <SelectTrigger className={cn('h-10 w-[180px] cursor-pointer font-medium select-none focus-visible:ring-0', classNames.trigger)}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="top-[-3px] border-none [&>div]:p-0!">
        <div className="bg-background rounded-md border p-1">
          {categoryList.map(({ categoryPublicName, category, count }) => {
            return (
              <SelectItem
                className={cn(
                  'text-secondary-foreground focus:bg-secondary focus:text-foreground h-10 cursor-pointer px-2 font-medium select-none',
                  classNames.item,
                )}
                key={category}
                value={category}
              >
                {categoryPublicName} ({count})
              </SelectItem>
            );
          })}
        </div>
      </SelectContent>
    </Select>
  );
}
