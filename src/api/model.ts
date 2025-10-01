export interface ApiResponse<T = undefined> {
  code: number;
  message: string;
  data: T;
}
