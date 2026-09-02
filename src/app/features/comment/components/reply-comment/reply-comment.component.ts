import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { Comment } from '../../../post/models/get-all-comments-response';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../../home/models/get-all-posts-response';

@Component({
  selector: 'app-reply-comment',
  imports: [CommentComponent],
  templateUrl: './reply-comment.component.html',
  styleUrl: './reply-comment.component.css',
})
export class ReplyCommentComponent implements OnInit {
  ngOnInit(): void {
    this.getReplies();
  }

  private readonly commentService = inject(CommentService);
  @Input() comment!: Comment;
  @Input() post!: Post;
  @Output() AddedComment = new EventEmitter<Comment[]>();
  replies = signal<Comment[] | null>(null);

  getReplies() {
    this.commentService.getReply(this.comment.post, this.comment._id).subscribe({
      next: (res) => {
        console.log(res);
        this.replies.set(res.data.replies);
        this.AddedComment.emit(res.data.replies);
      },
    });
  }
}
