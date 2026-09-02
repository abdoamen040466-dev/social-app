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

interface Reply {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string;
  likes: any[];
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}
