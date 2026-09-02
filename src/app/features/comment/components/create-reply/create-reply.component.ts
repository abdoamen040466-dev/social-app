import { Component, Input } from '@angular/core';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { Comment } from '../../../post/models/get-all-comments-response';
import { Post } from '../../../home/models/get-all-posts-response';

@Component({
  selector: 'app-create-reply',
  imports: [CreateCommentComponent],
  templateUrl: './create-reply.component.html',
  styleUrl: './create-reply.component.css',
})
export class CreateReplyComponent {
  @Input() comment!: Comment;
  @Input() post!: Post;
}
