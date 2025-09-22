export interface PostRequest {
  id: number;
  data: PostData;
}

export interface PostData {
  title: string;
  content: string;
  tags: string[];
}
