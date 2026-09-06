import { Comment } from '../../post/models/get-all-comments-response';

export interface CreateCommentResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  comment: Comment;
}
