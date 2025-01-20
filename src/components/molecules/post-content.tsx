import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

import { Post as PostType } from '@/types/post';

import { MDXComponents } from '@/components/mdx';

interface PostProps {
  className?: string;
  post: PostType;
}

export default async function PostContent({ className, post }: PostProps) {
  return (
    <article className={className}>
      <MDXRemote
        source={post.content}
        components={MDXComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm, // GitHub Flavored Markdown: 표, 체크리스트, URL 자동 링크 등
              remarkBreaks, // 엔터 한 번으로 줄바꿈 가능 (기본은 두 번)
            ],
            rehypePlugins: [
              rehypeSlug, // 모든 헤딩 태그에 id 자동 추가 (목차 링크용)
              [
                rehypePrettyCode, // 코드 블록 구문 강조 및 테마 적용
                { theme: { light: 'light-plus', dark: 'dark-plus' } },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
