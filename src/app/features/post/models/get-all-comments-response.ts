export interface GetAllCommentsResponse {
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
  comments: Comment[];
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  repliesCount: number;
  image: string;
}

interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
