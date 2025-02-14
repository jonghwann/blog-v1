import { Metadata } from 'next';

import { getCategoryPublicName } from '@/lib/post';

import { CategoryPageProps } from './page';

import { sharedMetadata } from '@/app/shared-metadata';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  const categoryPublicName = await getCategoryPublicName(category);

  const title = `${categoryPublicName} | ${sharedMetadata.title}`;

  return {
    title,
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
