import Link from 'next/link';

import { cn } from '@/lib/utils';

import { CategoryItem } from '@/types/post';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  className?: string;
  classNames?: { trigger?: string };
  defaultValue: string;
  categoryList: CategoryItem[];
  baseUrl: string;
}

export default function CategoryTabs({ className, classNames = {}, defaultValue, categoryList, baseUrl }: CategoryTabsProps) {
  return (
    <Tabs className={cn('h-10 border-b', className)} defaultValue={defaultValue}>
      <TabsList className="h-full p-0">
        {categoryList.map(({ category, categorySlug, count }) => {
          return (
            <TabsTrigger
              key={category}
              value={categorySlug === 'all' ? 'All' : categorySlug}
              className={cn(
                'text-tertiary-foreground relative h-full rounded-none px-4 py-[10px] transition-none',
                'hover:text-foreground',
                'data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:after:bg-black dark:data-[state=active]:after:bg-white',
                'after:absolute after:bottom-[0px] after:h-[2px] after:w-full after:rounded-full after:content-[""]',
                classNames.trigger,
              )}
              asChild
            >
              <Link href={category === 'All' ? baseUrl : `${baseUrl}/${categorySlug}`}>
                {category} ({count})
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
