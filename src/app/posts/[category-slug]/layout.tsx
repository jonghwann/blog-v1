import { Metadata } from 'next';

import { categorySlugToCategory } from '@/lib/post';

import { CategoryPageProps } from './page';

import { sharedMetadata } from '@/app/shared-metadata';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { 'category-slug': categorySlug } = await params;

  const category = await categorySlugToCategory(categorySlug);

  const title = `${category} | ${sharedMetadata.title}`;

  return {
    title,
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
