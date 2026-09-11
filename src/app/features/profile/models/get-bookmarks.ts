import { Post } from '../../home/models/get-all-posts-response';

export interface GetBookmarks {
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
  limit: number;
  total: number;
  numberOfPages: number;
}

interface Data {
  bookmarks: Post[];
}
