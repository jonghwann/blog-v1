import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import matter from 'gray-matter';
import { sync } from 'glob';

import { Post, PostMatter } from '@/types/post';
const BASE_PATH = '/src/posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

// 모든 MDX 파일 경로 조회
export const getAllMdxFilePaths = (category?: string): string[] => {
  try {
    const folder = category || '**';
    const paths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
    return paths;
  } catch (error) {
    console.error('Error occurred:', error);
    return [];
  }
};

// 모든 포스트 목록 조회
export const getAllPosts = async (category?: string): Promise<Post[]> => {
  try {
    const paths: string[] = getAllMdxFilePaths(category);
    const posts = await Promise.all(paths.map((postPath) => parsePost(postPath)));
    return posts;
  } catch (error) {
    console.error('Error occurred:', error);
    return [];
  }
};

// MDX 파일을 파싱하여 포스트의 요약 정보와 세부 정보를 결합
const parsePost = async (postPath: string): Promise<Post> => {
  try {
    const postAbstract = parsePostAbstract(postPath);
    const postDetail = await parsePostDetail(postPath);
    return { ...postAbstract, ...postDetail };
  } catch (error) {
    console.error('Error occurred:', error);
    return { title: '', content: '', thumbnail: '', date: '', category: '', url: '' };
  }
};

// MDX 파일에서 포스트의 요약 정보 파싱
export const parsePostAbstract = (postPath: string) => {
  try {
    const filePath = postPath.slice(postPath.indexOf(BASE_PATH)).replace(`${BASE_PATH}/`, '').replace('.mdx', '');
    const [category, slug] = filePath.split('/');
    const url = `/posts/${category}/${slug}`;
    return { category, url };
  } catch (error) {
    console.error('Error occurred:', error);
    return { url: '', category: '' };
  }
};

// MDX 파일에서 포스트의 세부 정보 파싱
const parsePostDetail = async (postPath: string) => {
  try {
    const file = fs.readFileSync(postPath, 'utf8');
    const { data, content } = matter(file);
    const grayMatter = data as PostMatter;
    const date = grayMatter.date ? format(new Date(grayMatter.date), 'yyyy.MM.dd') : '';
    return { ...grayMatter, content, date };
  } catch (error) {
    console.error('Error occurred:', error);
    return { title: '', content: '', thumbnail: '', date: '' };
  }
};
