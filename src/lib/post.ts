import fs, { readdirSync } from 'fs';
import path from 'path';

import { glob } from 'glob';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { PostInfo, PostMatter, PostDetail, Post, CategoryItem, TableOfContents } from '@/types/post';

const POST_PATH = '/src/posts';
const POST_DIRECTORY = path.join(process.cwd(), POST_PATH);

/**
 * 카테고리를 받아 실제 폴더명을 반환합니다.
 * @param category - 카테고리 (예: 'nextjs')
 * @returns 실제 폴더명 (예: 'next-js')
 *
 * 주의: 일치하는 폴더명이 없으면 입력된 category를 그대로 반환합니다.
 */
const getFolderNameByCategory = (category: string) => {
  const categories = readdirSync(POST_DIRECTORY);
  return categories.find((folderName) => folderName.replace(/-/g, '') === category) || category;
};

/**
 * 실제 폴더명을 카테고리 퍼블릭 네임으로 변환합니다.
 * @param category - 실제 폴더명 (예: 'next-js')
 * @returns 카테고리 퍼블릭 네임 (예: 'NextJs')
 */
export const getCategoryPublicName = (category: string): string => {
  return category
    .split(/[-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

/**
 * 마크다운 콘텐츠에서 미리보기 텍스트를 추출합니다.
 * @param content - 마크다운 콘텐츠
 * @param maxLength - 최대 길이 (기본값: 150)
 * @returns {string} 미리보기 텍스트 (예: 'Next.js는 React 프레임워크입니다...')
 */
const getExcerpt = (content: string, maxLength = 150): string => {
  const plainText = content.replace(/<[^>]+>|!?\[.*?\]\(.*?\)|```[\s\S]*?```|`.*?`|\*\*|\*|#+\s?|>|\||---|\d+\.|-|\n/g, '').trim();
  return plainText.length > maxLength ? plainText.slice(0, maxLength).trim() + '...' : plainText;
};

/**
 * 특정 카테고리의 MDX 파일 경로들을 조회합니다.
 * @param category - 조회할 카테고리 ('all'인 경우 모든 카테고리)
 * @returns MDX 파일 경로 배열 (예: ['/posts/next-js/server-components.mdx', ...])
 */
export const getMdxPathList = async (category: string): Promise<string[]> => {
  const categoryPattern = category === 'all' ? '*' : category;
  return await glob(`${POST_DIRECTORY}/${categoryPattern}/**/*.mdx`);
};

/**
 * MDX 파일을 파싱하여 포스트 데이터를 생성합니다.
 * @param filePath - MDX 파일 경로 (예: '/posts/next-js/server-components.mdx')
 * @returns {Promise<Post>} 포스트 데이터
 */
const parsePost = async (filePath: string): Promise<Post> => {
  const postInfo = parsePostInfo(filePath);
  const postDetail = await parsePostDetail(filePath);
  return { ...postInfo, ...postDetail };
};

/**
 * 파일 경로에서 포스트 정보를 파싱합니다.
 * @param filePath - MDX 파일 경로 (예: '/posts/next-js/server-components.mdx')
 * @returns {PostInfo} 포스트 정보
 */
export const parsePostInfo = (filePath: string): PostInfo => {
  const postPath = path.relative(POST_DIRECTORY, filePath).replace(/\\/g, '/').replace('.mdx', '');
  const [category, post] = postPath.split('/');

  const categoryPublicName = getCategoryPublicName(category);
  const categorySlug = category.replace(/-/g, '');
  const postUrl = `/posts/${categorySlug}/${post}`;

  return { categoryPublicName, postUrl, category: categorySlug, post };
};

/**
 * MDX 파일에서 포스트 상세 정보를 파싱합니다.
 * @param filePath - MDX 파일 경로 (예: '/posts/next-js/server-components.mdx')
 * @returns {Promise<PostDetail>} 포스트 상세 정보
 */
const parsePostDetail = async (filePath: string): Promise<PostDetail> => {
  const fileContent = await fs.promises.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const frontMatter = data as PostMatter;
  const excerpt = getExcerpt(content);

  return {
    ...frontMatter,
    excerpt,
    readingMinutes: Math.ceil(readingTime(content).minutes),
    content,
  };
};

/**
 * 모든 카테고리 정보를 조회합니다.
 * @returns {CategoryItem[]} 알파벳 오름차순으로 정렬된 카테고리 목록
 */
export const getCategoryList = async (): Promise<CategoryItem[]> => {
  const postList = await getPostList('all');

  const categoryCountMap = postList.reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
    return counts;
  }, {});

  const categoryList = Object.entries(categoryCountMap)
    .map(([category, count]) => ({
      category,
      categoryPublicName: getCategoryPublicName(getFolderNameByCategory(category)),
      count,
    }))
    .sort((categoryPrev, categoryNext) => categoryPrev.category.localeCompare(categoryNext.category));

  return [{ categoryPublicName: 'All', category: 'all', count: postList.length }, ...categoryList];
};

/**
 * 특정 카테고리의 포스트 목록을 조회합니다.
 * @param category - 조회할 카테고리 ('all'인 경우 모든 카테고리)
 * @returns {Promise<Post[]>} 날짜순으로 정렬된 포스트 목록
 */
export const getPostList = async (category: string): Promise<Post[]> => {
  const mdxPaths = await getMdxPathList(getFolderNameByCategory(category));
  const postList = await Promise.all(mdxPaths.map(parsePost));

  return postList.sort((recentPost, previousPost) => {
    const recentTimestamp = recentPost.createdAt ? new Date(recentPost.createdAt).getTime() : 0;
    const previousTimestamp = previousPost.createdAt ? new Date(previousPost.createdAt).getTime() : 0;
    return previousTimestamp - recentTimestamp;
  });
};

/**
 * 특정 포스트의 상세 정보를 조회합니다.
 * @param category - 카테고리 (예: 'nextjs')
 * @param post - 포스트 (예: 'server-components')
 * @returns {Promise<Post>} 포스트 상세 정보
 */
export const getPostDetail = async (category: string, post: string): Promise<Post> => {
  const filePath = `${POST_DIRECTORY}/${getFolderNameByCategory(category)}/${post}/content.mdx`;
  return parsePost(filePath);
};

/**
 * 마크다운 내용에서 h2(##) 제목을 추출하여 목차를 생성합니다.
 * @param content - 마크다운 문자열
 * @returns {TableOfContents[]} 목차 정보
 */
export const getTableOfContents = (content: string): TableOfContents[] => {
  const headingRegex = /^(#{2})\s+(.+)$/gm;
  const matches = Array.from(content.matchAll(headingRegex));

  return matches.map(([, marker, text]) => {
    const title = text.trim();

    const anchorId = title
      .toLowerCase()
      .replace(/[^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');

    return {
      title,
      link: `#${anchorId}`,
      depth: marker.length - 2,
    };
  });
};
