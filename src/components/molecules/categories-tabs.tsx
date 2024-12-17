import Link from 'next/link';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Categories } from '@/types/post';

interface CategoriesTabs {
  defaultValue: string;
  categories: Categories[];
  buildHref: (category: string) => string;
}

export default function CategoriesTabs({ defaultValue, categories, buildHref }: CategoriesTabs) {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        {categories.map((categoryItem) => {
          const { category, count } = categoryItem;
          return (
            <TabsTrigger key={category} value={category}>
              <Link href={buildHref(category)}>
                {category} ({count})
              </Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
