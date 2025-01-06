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
                className="py-2 hover:bg-[--color-bg-muted] data-[state=active]:bg-[--color-bg-inverse] data-[state=active]:text-[--color-text-inverse] data-[state=active]:shadow-none hover:data-[state=active]:bg-[--color-bg-inverse-hover]"
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
