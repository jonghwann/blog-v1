import Link from 'next/link';

import { Categories } from '@/types/post';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  defaultValue: string;
  categories: Categories[];
  baseUrl: string;
}

export default function CategoryTabs({ defaultValue, categories, baseUrl }: CategoryTabsProps) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        {categories.map(({ category, count }) => {
          return (
            <TabsTrigger key={category} value={category}>
              <Link href={category === 'all' ? baseUrl : `${baseUrl}/${category}`}>
                {category} ({count})
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
