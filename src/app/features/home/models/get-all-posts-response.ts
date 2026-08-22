import { User } from '../../../core/models/user';

export interface AllPostsResponse {
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

export interface Post {
  _id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: User;
  sharedPost: Post | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

interface TopComment {
  _id: string;
  content: string;
  image: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: string[];
  createdAt: string;
}
