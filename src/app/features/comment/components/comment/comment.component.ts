import { Component, Input, input } from '@angular/core';
import { Comment } from '../../../post/models/get-all-comments-response';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() comment!: Comment;
}
