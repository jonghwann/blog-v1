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
