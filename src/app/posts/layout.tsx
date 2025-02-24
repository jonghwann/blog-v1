import { Metadata } from 'next';

import { sharedMetadata } from '../shared-metadata';

export const metadata: Metadata = {
  title: sharedMetadata.title,
  openGraph: {
    title: sharedMetadata.title,
    description: sharedMetadata.description,
  },
  twitter: {
    title: sharedMetadata.title,
    description: sharedMetadata.description,
  },
};

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
