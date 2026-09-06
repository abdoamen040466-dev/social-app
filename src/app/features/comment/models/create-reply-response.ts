import { Comment } from '../../post/models/get-all-comments-response';

export interface CreateReplyResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  reply: Comment;
}
