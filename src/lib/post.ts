import fs from 'fs';
import path from 'path';

import { sync } from 'glob';
import { format } from 'date-fns';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { Categories, Post, PostMatter } from '@/types/post';

const POSTS_BASE_PATH = '/src/posts';
const POSTS_DIRECTORY = path.join(process.cwd(), POSTS_BASE_PATH);
const MAX_EXCERPT_LENGTH = 150;

// 포스트 파일 경로 조회
const getPostPaths = (category: string): string[] => {
  const categoryPath = category === 'All' ? '*' : category;
  return sync(`${POSTS_DIRECTORY}/${categoryPath}/**/*.mdx`);
};

// 포스트 파싱
const parsePost = (filePath: string): Post => {
  const postInfo = parsePostAbstract(filePath);
  const postData = parsePostDetail(filePath);
  return { ...postInfo, ...postData };
};

// 포스트 경로 정보 파싱
const parsePostAbstract = (filePath: string): Pick<Post, 'category' | 'categoryPath' | 'url'> => {
  const postPath = path.relative(POSTS_DIRECTORY, filePath).replace('.mdx', '');
  const [categoryPath, slug] = postPath.split('/');

  const category = formatCategoryName(categoryPath);
  const postUrl = `/posts/${categoryPath}/${slug}`;
  return { category, categoryPath, url: postUrl };
};

// 포스트 콘텐츠 파싱
const parsePostDetail = (filePath: string): Omit<Post, 'category' | 'categoryPath' | 'url'> => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const postMatter = data as PostMatter;

  const excerpt = getExcerpt(content);
  const date = postMatter.date ? format(new Date(postMatter.date), 'yyyy.MM.dd') : '';

  return {
    ...postMatter,
    excerpt,
    content,
    date,
    readingMinutes: Math.ceil(readingTime(content).minutes),
  };
};

// 콘텐츠 미리보기 텍스트 추출
const getExcerpt = (content: string, maxLength: number = MAX_EXCERPT_LENGTH): string => {
  const plainText = content
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*`]/g, '')
    .replace(/(?:^|\n)> /g, '')
    .replace(/\n/g, ' ')
    .trim();

  return plainText.length > maxLength ? plainText.slice(0, maxLength).trim() + '...' : plainText;
};

// 카테고리 폴더명을 화면에 표시할 형식으로 변환 next_js -> Next Js
export const formatCategoryName = (dirPath: string): string =>
  dirPath
    .split('_')
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(' ');

// 카테고리 조회
export const getCategories = (): Categories[] => {
  const allPosts = getPosts('All');

  const categoryCounts = allPosts.reduce<Record<string, number>>((counts, post) => {
    counts[post.categoryPath] = (counts[post.categoryPath] || 0) + 1;
    return counts;
  }, {});

  const categories = Object.entries(categoryCounts).map(([categoryPath, count]) => ({
    category: formatCategoryName(categoryPath),
    categoryPath,
    count,
  }));

  return [{ category: 'All', categoryPath: 'all', count: allPosts.length }, ...categories];
};

// 포스트 목록 조회
export const getPosts = (category: string): Post[] => {
  const postPaths = getPostPaths(category);
  const posts = postPaths.map(parsePost);

  return posts.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
};
