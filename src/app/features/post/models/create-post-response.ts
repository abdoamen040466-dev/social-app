export interface CreatePostResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  post: Post;
}

interface Post {
  body: string;
  privacy: string;
  user: string;
  sharedPost: null;
  likes: string[];
  _id: string;
  createdAt: string;
  likesCount: number;
  isShare: boolean;
  id: string;
}
