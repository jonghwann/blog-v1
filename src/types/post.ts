import type { Tag } from './tag';

export interface PostSummary {
  id: number;
  title: string;
  createdAt: Date;
  summary: string;
  tags: Tag[];
}

export interface Post extends PostSummary {
  content: string;
  updatedAt: Date;
  readingTime: number;
  html: string;
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
