import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { Comment } from '../../../post/models/get-all-comments-response';
import { CommentService } from '../../services/comment.service';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { Post } from '../../../home/models/get-all-posts-response';

@Component({
  selector: 'app-comment',
  imports: [],
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
  @Input() post!: Post;
  @Output() deletedComment = new EventEmitter<Comment>();

  @ViewChild('menu') menu!: ElementRef;

  isMenuOpened: boolean = false;

  likedComment = signal<boolean>(false);
  userId: string | undefined = this.authService.getUser()?._id;

  isOwner(): boolean {
    return this.comment.commentCreator._id === this.authService.getUser()?._id;
  }

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

  deleteComment() {
    this.commentService.deleteComment(this.post._id, this.comment._id).subscribe({
      next: () => {
        this.deletedComment.emit(this.comment);
      },
    });
  }

  @HostListener('document:click', ['$event']) onClick(evenet: MouseEvent) {
    const target = evenet.target as Node;
    if (this.menu.nativeElement.contains(target)) {
      this.isMenuOpened = !this.isMenuOpened;
    } else {
      this.isMenuOpened = false;
    }
  }
}
