import { Component, inject, Input, input, signal } from '@angular/core';
import { Comment } from '../../../post/models/get-all-comments-response';
import { CommentService } from '../../services/comment.service';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { CreateCommentComponent } from '../create-comment/create-comment.component';

@Component({
  selector: 'app-comment',
  imports: [CreateCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  private readonly commentService = inject(CommentService);
  private readonly authService = inject(AuthStorageService);

  ngOnInit(): void {
    this.likedComment.set(this.userLiked());
  }

  @Input() comment!: Comment;
  likedComment = signal<boolean>(false);
  userId: string | undefined = this.authService.getUser()?._id;

  userLiked(): boolean {
    if (!this.userId) {
      return false;
    }
    return this.comment.likes.includes(this.userId);
  }

  toggleLikeComment(postId: string, commentId: string) {
    this.commentService.toggleLikeComment(postId, commentId).subscribe({
      next: (res) => {
        if (res.data.liked && this.userId) {
          this.comment.likes.push(this.userId);
          this.likedComment.set(true);
        } else {
          this.comment.likes.splice(this.comment.likes.indexOf(this.userId!), 1);
          this.likedComment.set(false);
        }
      },
    });
  }
}
