import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Categories } from '@/types/post';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  className?: string;
  classNames?: { trigger?: string };
  defaultValue: string;
  categories: Categories[];
  baseUrl: string;
}

export default function CategoryTabs({ className, classNames = {}, defaultValue, categories, baseUrl }: CategoryTabsProps) {
  return (
    <Tabs className={className} defaultValue={defaultValue}>
      <TabsList className="gap-2">
        {categories.map(({ category, categoryPath, count }) => {
          return (
            <TabsTrigger
              key={category}
              value={categoryPath === 'all' ? 'All' : categoryPath}
              className={cn(
                'py-2 hover:bg-secondary-background data-[state=active]:bg-contrast-background data-[state=active]:text-contrast-foreground data-[state=active]:shadow-none hover:data-[state=active]:bg-[#24292f] hover:data-[state=active]:dark:bg-[#f0f3f6]',
                classNames.trigger,
              )}
              asChild
            >
              <Link href={category === 'All' ? baseUrl : `${baseUrl}/${categoryPath}`}>
                {category} ({count})
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
