import { Metadata } from 'next';

import { getPostDetail } from '@/lib/post';

import { PostPageProps } from './page';

import { sharedMetadata } from '@/app/shared-metadata';

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { 'category-slug': categorySlug, 'post-slug': postSlug } = await params;

  const post = await getPostDetail(categorySlug, postSlug);

  const title = `${post.title} | ${sharedMetadata.title}`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
    },
    twitter: {
      title,
      description: post.excerpt,
    },
  };
}

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
