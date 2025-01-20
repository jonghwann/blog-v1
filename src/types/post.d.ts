export interface PostInfo {
  category: string;
  postUrl: string;
  categorySlug: string;
  postSlug: string;
}

export interface PostMatter {
  title: string;
  createdAt: string;
  thumbnail: string;
}

export interface PostDetail extends PostMatter {
  excerpt: string;
  readingMinutes: number;
  content: string;
}

export interface Post extends PostInfo, PostDetail {}

export interface CategoryItem {
  category: string;
  categorySlug: string;
  count: number;
}

export interface TableOfContents {
  title: string;
  link: string;
  depth: number;
}
