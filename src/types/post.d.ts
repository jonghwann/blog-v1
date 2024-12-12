export interface PostMatter {
  title: string;
  date: string;
  thumbnail: string;
}

export interface Post extends PostMatter {
  content: string;
  category: string;
  url: string;
}

export interface Categories {
  category: string;
  count: number;
}
