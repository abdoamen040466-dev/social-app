import { Comment } from '../../post/models/get-all-comments-response';

export interface UpdateCommentResponse {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  comment: Comment;
}
