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
    <Tabs className={className} defaultValue={defaultValue}>
      <TabsList className="gap-2 p-0">
        {categoryList.map(({ category, categorySlug, count }) => {
          return (
            <TabsTrigger
              key={category}
              value={categorySlug === 'all' ? 'All' : categorySlug}
              className={cn(
                'py-2 transition-none hover:bg-secondary-background data-[state=active]:bg-contrast-background data-[state=active]:text-contrast-foreground data-[state=active]:shadow-none hover:data-[state=active]:bg-[#19191be6] hover:data-[state=active]:dark:bg-[#fafafae6]',
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
