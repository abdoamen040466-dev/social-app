import { Post } from '../../home/models/get-all-posts-response';

export interface GetMyPosts {
  success: boolean;
  message: string;
  data: Data;
  meta: Meta;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  total: number;
}

interface Data {
  posts: Post[];
}
