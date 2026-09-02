import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Post } from '../../../home/models/get-all-posts-response';
import { FormControl, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Comment } from '../../../post/models/get-all-comments-response';

@Component({
  selector: 'app-create-comment',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css',
})
export class CreateCommentComponent {
  private readonly commentService = inject(CommentService);

  @Input() post!: Post;
  @Input() comment!: Comment;
  @Input() isReply: boolean = false;
  @Output() newComment = new EventEmitter<Comment>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  content: FormControl = new FormControl();

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

  deleteImage() {
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }
    this.selectedImage = null;
    this.imagePreview = null;
    this.fileInput.nativeElement.value = '';
  }

  createComment() {
    console.log('hi');

    const formData = new FormData();
    formData.append('content', this.content.getRawValue() ?? '');
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    if (this.isReply) {
      this.commentService.createReply(this.post._id, this.comment?._id, formData).subscribe({
        next: (res) => {
          this.newComment.emit(res.data.reply);
          console.log(res);
          this.content.reset();
        },
      });
    } else {
      this.commentService.createComment(this.post._id, formData).subscribe({
        next: (res) => {
          this.newComment.emit(res.data.comment);
          console.log(res);
          this.content.reset();
        },
      });
    }
  }
}
