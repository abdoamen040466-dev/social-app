import { Post } from '../../home/models/get-all-posts-response';

export interface GetSinglePost {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  post: Post;
}
