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
