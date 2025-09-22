import type { Tag } from './tag';

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  summary: string;
  tags: Tag[];
  readingTime: number;
}

export interface PostDetail {
  post: Post;
  navigation: Navigation;
}

export interface Navigation {
  prev: NavigationItem | null;
  next: NavigationItem | null;
}

export interface NavigationItem {
  id: number;
  title: string;
}
