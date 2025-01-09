import Link from 'next/link';

import { Categories } from '@/types/post';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  className?: string;
  defaultValue: string;
  categories: Categories[];
  baseUrl: string;
}

export default function CategoryTabs({ className, defaultValue, categories, baseUrl }: CategoryTabsProps) {
  return (
    <Tabs className={className} defaultValue={defaultValue}>
      <TabsList className="gap-2">
        {categories.map(({ category, count }) => {
          return (
            <Link key={category} href={category === 'all' ? baseUrl : `${baseUrl}/${category}`}>
              <TabsTrigger
                value={category}
                className="data-[state=active]:text-contrast-foreground py-2 hover:bg-secondary-background data-[state=active]:bg-contrast-background data-[state=active]:shadow-none hover:data-[state=active]:bg-[#24292f] hover:data-[state=active]:dark:bg-[#f0f3f6]"
              >
                {category} ({count})
              </TabsTrigger>
            </Link>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
