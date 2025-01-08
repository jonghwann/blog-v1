export interface PostMatter {
  thumbnail: string;
  title: string;
  date: string;
}

export interface Post extends PostMatter {
  category: string;
  excerpt: string;
  content: string;
  readingMinutes: number;
  url: string;
}

export interface Categories {
  category: string;
  count: number;
}
