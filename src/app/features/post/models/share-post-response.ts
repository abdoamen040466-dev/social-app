import { Post } from '../../home/models/get-all-posts-response';

export interface SharePostResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  post: Post;
}
