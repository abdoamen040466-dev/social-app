import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { Comment } from '../../../post/models/get-all-comments-response';
import { CommentService } from '../../services/comment.service';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { Post } from '../../../home/models/get-all-posts-response';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CreateReplyComponent } from '../create-reply/create-reply.component';

@Component({
  selector: 'app-comment',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, CreateReplyComponent],
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
  @Input() isReply: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() deletedComment = new EventEmitter<Comment>();
  @Output() UpdatedComment = new EventEmitter<Comment>();
  @Output() ReplyComment = new EventEmitter<Comment>();

  isMenuOpened: boolean = false;
  likedComment = signal<boolean>(false);
  userId: string | undefined = this.authService.getUser()?._id;
  isEditing = signal<boolean>(false);
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  showReply: boolean = false;

  content: FormControl = new FormControl();

  sendReply(comment: Comment) {
    this.showReply = false;
    this.ReplyComment.emit(comment);
  }

  toggleReply() {
    this.showReply = !this.showReply;
  }

  startEditing() {
    this.isMenuOpened = false;
    this.isEditing.set(true);
    this.content.reset(this.comment.content);
    if (this.comment.image) {
      this.imagePreview = this.comment.image;
    }
  }

  canselEdit() {
    this.isEditing.set(false);
    this.deleteImage();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }

    this.selectedImage = input.files[0];
    this.imagePreview = URL.createObjectURL(this.selectedImage);
  }

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

  deleteImage() {
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }
    this.selectedImage = null;
    this.imagePreview = null;
    if (this.fileInput) this.fileInput.nativeElement.value = '';
    this.selectedImage = null;
  }

  editComment() {
    const formData = new FormData();
    formData.append('content', this.content.getRawValue() ?? '');
    console.log(this.content.getRawValue());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    } else {
      formData.append('image', '');
    }
    this.commentService.editComment(this.post._id, this.comment._id, formData).subscribe({
      next: (res) => {
        this.UpdatedComment.emit(res.data.comment);
        this.content.reset();
        this.isEditing.set(false);
      },
    });
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpened = !this.isMenuOpened;
  }

  @HostListener('document:click')
  closeMenu() {
    this.isMenuOpened = false;
  }
}
