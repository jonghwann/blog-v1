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
    <Select defaultValue={defaultValue} onValueChange={(value) => router.push(value === 'All' ? baseUrl : `${baseUrl}/${value}`)}>
      <SelectTrigger className={cn('h-10 w-[180px] select-none focus:ring-0', classNames.trigger)}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="top-[-3px] border-none [&>div]:!p-0">
        <div className="rounded-md border bg-background p-1">
          {categoryList.map(({ category, categorySlug, count }) => {
            return (
              <SelectItem
                key={category}
                value={categorySlug === 'all' ? 'All' : categorySlug}
                className={cn('h-10 select-none px-2 text-[13px] focus:bg-secondary-background', classNames.item)}
              >
                {category} ({count})
              </SelectItem>
            );
          })}
        </div>
      </SelectContent>
    </Select>
  );
}
