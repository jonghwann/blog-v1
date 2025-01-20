import fs from 'fs';
import path from 'path';

import { glob } from 'glob';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { PostInfo, PostMatter, PostDetail, Post, CategoryItem, TableOfContents } from '@/types/post';

const POST_PATH = '/src/posts';
const POST_DIRECTORY = path.join(process.cwd(), POST_PATH);

/**
 * 카테고리 슬러그를 카테고리로 변환합니다.
 * @param categorySlug - 카테고리 슬러그 (예: 'next-js')
 * @returns 카테고리 (예: 'Next Js')
 */
export const formatCategory = (categorySlug: string): string =>
  categorySlug
    .split('-')
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(' ');

/**
 * 특정 카테고리의 MDX 파일 경로들을 조회합니다.
 * @param category - 조회할 카테고리 ('All'인 경우 모든 카테고리)
 * @returns MDX 파일 경로 배열 (예: ['/posts/next-js/routing/content.mdx', ...])
 */
export const getMdxPathList = async (category: string): Promise<string[]> => {
  const categoryPattern = category === 'All' ? '*' : category;
  return await glob(`${POST_DIRECTORY}/${categoryPattern}/**/*.mdx`);
};

/**
 * MDX 파일을 파싱하여 포스트 데이터를 생성합니다.
 * @param filePath - MDX 파일 경로 (예: '/posts/next_js/server-components.mdx')
 * @returns {Promise<Post>} 포스트 데이터
 */
const parsePost = async (filePath: string): Promise<Post> => {
  const postInfo = parsePostInfo(filePath);
  const postDetail = await parsePostDetail(filePath);
  return { ...postInfo, ...postDetail };
};

/**
 * 파일 경로에서 포스트 정보를 파싱합니다.
 * @param filePath - MDX 파일 경로 (예: '/posts/next_js/server-components.mdx')
 * @returns {PostInfo} 포스트 정보
 */
export const parsePostInfo = (filePath: string): PostInfo => {
  const postPath = path.relative(POST_DIRECTORY, filePath).replace(/\\/g, '/').replace('.mdx', '');
  const [categorySlug, postSlug] = postPath.split('/');

  const category = formatCategory(categorySlug);
  const postUrl = `/posts/${categorySlug}/${postSlug}`;
  return { category, postUrl, categorySlug, postSlug };
};

/**
 * MDX 파일에서 포스트 상세 정보를 파싱합니다.
 * @param filePath - MDX 파일 경로 (예: '/posts/next_js/server-components.mdx')
 * @returns {Promise<PostDetail>} 포스트 상세 정보
 */
const parsePostDetail = async (filePath: string): Promise<PostDetail> => {
  const fileContent = await fs.promises.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const frontMatter = data as PostMatter;

  return {
    ...frontMatter,
    readingMinutes: Math.ceil(readingTime(content).minutes),
    content,
  };
};

/**
 * 모든 카테고리 정보를 조회합니다.
 * @returns {Category[]} 카테고리 목록
 */
export const getCategoryList = async (): Promise<CategoryItem[]> => {
  const postList = await getPostList('All');

  const categoryCountMap = postList.reduce<Record<string, number>>((counts, post) => {
    counts[post.categorySlug] = (counts[post.categorySlug] || 0) + 1;
    return counts;
  }, {});

  const categoryList = Object.entries(categoryCountMap).map(([categorySlug, count]) => ({
    category: formatCategory(categorySlug),
    categorySlug,
    count,
  }));

  return [{ category: 'All', categorySlug: 'all', count: postList.length }, ...categoryList];
};

/**
 * 특정 카테고리의 포스트 목록을 조회합니다.
 * @param category - 조회할 카테고리 ('All'인 경우 모든 카테고리)
 * @returns {Promise<Post[]>} 날짜순으로 정렬된 포스트 목록
 */
export const getPostList = async (category: string): Promise<Post[]> => {
  const mdxPaths = await getMdxPathList(category);
  const postList = await Promise.all(mdxPaths.map(parsePost));

  return postList.sort((a, b) => {
    const timestampA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timestampB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timestampB - timestampA;
  });
};

/**
 * 특정 포스트의 상세 정보를 조회합니다.
 * @param categorySlug - 카테고리 슬러그 (예: 'next-js')
 * @param postSlug - 포스트 슬러그 (예: 'server-components')
 * @returns {Promise<Post>} 포스트 상세 정보
 */
export const getPostDetail = async (categorySlug: string, postSlug: string): Promise<Post> => {
  const filePath = `${POST_DIRECTORY}/${categorySlug}/${postSlug}/content.mdx`;
  return parsePost(filePath);
};

/**
 * 마크다운 내용에서 h2(##)와 h3(###) 제목을 추출하여 목차를 생성
 * @param content - 마크다운 문자열
 * @returns {TableOfContents[]} 목차 정보
 */
export const getTableOfContents = (content: string): TableOfContents[] => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
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
