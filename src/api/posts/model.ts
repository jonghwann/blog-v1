export interface UpdatePostRequest {
  id: number;
  data: PostFormData;
}

export interface PostFormData {
  title: string;
  content: string;
  tags: string[];
}
