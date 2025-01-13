export interface PostMatter {
  thumbnail: string;
  title: string;
  date: string;
}

export interface Post extends PostMatter {
  category: string;
  categoryPath: string;
  excerpt: string;
  content: string;
  readingMinutes: number;
  url: string;
  slug: string;
}

export interface Categories {
  category: string;
  categoryPath: string;
  count: number;
}

export interface HeadingItem {
  text: string;
  link: string;
  indent: number;
}
