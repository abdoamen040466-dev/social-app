import { Component, inject, Input, signal } from '@angular/core';
import { Post } from '../../../home/models/get-all-posts-response';
import { CommentComponent } from '../../../comment/components/comment/comment.component';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/get-all-comments-response';
import { CreateCommentComponent } from '../../../comment/components/create-comment/create-comment.component';
import { ReplyCommentComponent } from '../../../comment/components/reply-comment/reply-comment.component';
import { PostLikesComponentComponent } from '../post-likes-component/post-likes-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-footer',
  imports: [
    CommentComponent,
    CreateCommentComponent,
    ReplyCommentComponent,
    PostLikesComponentComponent,
  ],
  templateUrl: './post-footer.component.html',
  styleUrl: './post-footer.component.css',
})
export class PostFooterComponent {
  private readonly commentsService = inject(CommentsService);
  private readonly router = inject(Router);

  @Input() post!: Post;
  @Input() showLikesUser: boolean = false;

  comments = signal<Comment[]>([]);
  commentsVisible = signal(false);
  commentsLoaded = signal(false);
  createCommentflag: boolean = false;
  reply!: Comment;

  addNewComment(comment: Comment) {
    this.comments.update((comments) => [comment, ...comments]);
    this.post.commentsCount += 1;
    this.commentsLoaded.set(true);
    this.commentsVisible.set(true);
  }

  ShowReply(newReply: Comment) {
    console.log('okkkkk');

    const parentcomment = this.comments().filter(
      (comment) => comment._id === newReply.parentComment,
    );

    if (!parentcomment) return;
    if (parentcomment[0].repliesCount === 0) parentcomment[0].repliesCount += 1;
    else this.reply = newReply;
  }

  deleteComment(deletedComment: Comment) {
    // this.posts.update((posts) => posts.filter((post) => post._id !== id));
    this.comments.update((comments) =>
      comments.filter((comment) => comment._id !== deletedComment._id),
    );
  }

  updateComment(updatedComment: Comment) {
    this.comments.update((comments) =>
      comments.map((comment) => (comment._id === updatedComment._id ? updatedComment : comment)),
    );
  }

  showCreateComment(): void {
    this.createCommentflag = !this.createCommentflag;
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
        this.comments.set(res.data.comments);
        this.commentsVisible.set(true);
        this.commentsLoaded.set(true);
      },
    });
  }
  goToDetails() {
    this.router.navigate(['/post', this.post._id]);
  }
}
