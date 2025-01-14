export interface PostInfo {
  category: string;
  postUrl: string;
  categorySlug: string;
  postSlug: string;
}

export interface PostMatter {
  thumbnail: string;
  title: string;
  createdAt: string;
}

export interface PostDetail extends PostMatter {
  excerpt: string;
  readingMinutes: number;
  content: string;
}

export interface Post extends PostInfo, PostDetail {}

export interface Category {
  category: string;
  categorySlug: string;
  count: number;
}
