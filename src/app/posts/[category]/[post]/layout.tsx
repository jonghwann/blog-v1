import { Metadata } from 'next';

import { getPostDetail } from '@/lib/post';

import { PostPageProps } from './page';

import { sharedMetadata } from '@/app/shared-metadata';

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { category, post } = await params;

  const postDetail = await getPostDetail(category, post);

  const title = `${postDetail.title} | ${sharedMetadata.title}`;

  return {
    title,
    description: postDetail.excerpt,
    openGraph: {
      title,
      description: postDetail.excerpt,
    },
    twitter: {
      title,
      description: postDetail.excerpt,
    },
  };
}

export default function layout({ children }: { children: React.ReactNode }) {
  return children;
}
