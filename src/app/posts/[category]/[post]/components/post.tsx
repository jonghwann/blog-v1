import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

import { Post as PostType } from '@/types/post';
import { MDXComponents } from '@/components/mdx';

interface PostProps {
  post: PostType;
}

export default async function Post({ post }: PostProps) {
  return (
    <MDXRemote
      source={post.content}
      components={MDXComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkBreaks],
          rehypePlugins: [[rehypePrettyCode, { theme: { light: 'github-light', dark: 'github-dark-dimmed' } }], rehypeSlug],
        },
      }}
    />
  );
}
