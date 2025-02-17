import { MetadataRoute } from 'next';

import { getPostList } from '@/lib/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.jonghwan.dev';
  const postList = await getPostList('all');

  const sitemapList = postList.map(({ postUrl }) => ({
    url: `${baseUrl}${postUrl}`,
    lastModified: new Date(),
  }));

  return [{ url: baseUrl, lastModified: new Date() }, ...sitemapList];
}
