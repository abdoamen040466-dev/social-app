import { Post } from '../../home/models/get-all-posts-response';

export interface ToggleLikeResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  liked: boolean;
  likesCount: number;
  post: Post;
}

interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}
