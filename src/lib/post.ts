import fs from 'fs';
import path from 'path';

import { sync } from 'glob';
import { format } from 'date-fns';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { Categories, Post, PostMatter } from '@/types/post';

const POST_BASE_PATH = '/src/posts';
const POST_PATH = path.join(process.cwd(), POST_BASE_PATH);

// 포스트 파일 경로 조회
const getPostPaths = (category: string): string[] => {
  const categoryPath = category === 'all' ? '**' : category;
  return sync(`${POST_PATH}/${categoryPath}/**/*.mdx`);
};

// 포스트 파싱
const parsePost = (filePath: string): Post => {
  const postInfo = parsePostAbstract(filePath);
  const postData = parsePostDetail(filePath);
  return { ...postInfo, ...postData };
};

// 포스트 경로 정보 파싱
const parsePostAbstract = (filePath: string) => {
  const postPath = filePath.slice(filePath.indexOf(POST_BASE_PATH)).replace(`${POST_BASE_PATH}/`, '').replace('.mdx', '');
  const [category, slug] = postPath.split('/');
  const postUrl = `/posts/${category}/${slug}`;

  return { category, url: postUrl };
};

// 포스트 콘텐츠 파싱
const parsePostDetail = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const postMatter = data as PostMatter;

  return {
    ...postMatter,
    content,
    date: postMatter.date ? format(new Date(postMatter.date), 'yyyy.MM.dd') : '',
    readingMinutes: Math.ceil(readingTime(content).minutes),
  };
};

// 카테고리 조회
export const getCategories = (): Categories[] => {
  const posts = getPosts('all');
  const categoryMap = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  return [
    { category: 'all', count: posts.length },
    ...Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count,
    })),
  ];
};

// 포스트 목록 조회
export const getPosts = (category: string): Post[] => {
  const postPaths = getPostPaths(category);
  return postPaths.map(parsePost);
};
