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

interface TopComment3 {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

interface TopComment2 {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: string[];
  createdAt: string;
}

interface TopComment {
  _id: string;
  image: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
