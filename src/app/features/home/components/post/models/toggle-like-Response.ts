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

interface Post {
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  likesCount: number;
  isShare: boolean;
  id: string;
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
