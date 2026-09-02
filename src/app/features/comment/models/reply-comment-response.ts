import { Comment } from '../../post/models/get-all-comments-response';

export interface ReplyCommentResponse {
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
  replies: Comment[];
}
