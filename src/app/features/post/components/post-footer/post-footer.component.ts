import { Component, inject, Input, signal } from '@angular/core';
import { Post } from '../../../home/models/get-all-posts-response';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { PostService } from '../../services/post.service';
import { CommentComponent } from '../../../comment/components/comment/comment.component';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/get-all-comments-response';

@Component({
  selector: 'app-post-footer',
  imports: [CommentComponent],
  templateUrl: './post-footer.component.html',
  styleUrl: './post-footer.component.css',
})
export class PostFooterComponent {
  private readonly authService = inject(AuthStorageService);
  private readonly postService = inject(PostService);
  private readonly commentsService = inject(CommentsService);

  @Input() post!: Post;
  ngOnInit(): void {
    this.liked.set(this.userLiked());
  }

  liked = signal<boolean>(false);
  userId: string | undefined = this.authService.getUser()?._id;
  comments = signal<Comment[] | null>(null);
  commentsVisible = signal(false);
  commentsLoaded = signal(false);

  userLiked(): boolean {
    if (!this.userId) {
      return false;
    }
    return this.post.likes.includes(this.userId);
  }

  toggleLike() {
    this.postService.Togglelike(this.post._id).subscribe({
      next: (res) => {
        if (res.data.liked) {
          this.post.likesCount += 1;
          if (this.userId) {
            this.post.likes.push(this.userId);
          }
          this.liked.set(true);
        } else {
          this.post.likesCount -= 1;
          this.liked.set(false);
          if (this.userId) {
            this.post.likes.splice(this.post.likes.indexOf(this.userId), 1);
          }
        }
      },
    });
  }

  getAllComments(id: string) {
    if (this.commentsVisible()) {
      this.commentsVisible.set(false);
      return;
    }

    if (this.commentsLoaded()) {
      this.commentsVisible.set(true);
      return;
    }

    this.commentsService.getAllComments(id).subscribe({
      next: (res) => {
        console.log(res);
        this.comments.set(res.data.comments);
        this.commentsVisible.set(true);
        this.commentsLoaded.set(true);
      },
    });
  }
}
