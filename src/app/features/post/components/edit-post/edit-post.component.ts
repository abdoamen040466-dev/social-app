import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Post } from '../../../home/models/get-all-posts-response';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit-post',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  ngOnInit(): void {
    this.body.reset(this.post.body);
    this.privacy.reset(this.post.privacy);
    if (this.post.image) {
      this.imagePreview = this.post.image;
    }
  }
  private readonly postService = inject(PostService);

  @Input() post!: Post;
  @Output() editCompleted = new EventEmitter<void>();
  @Output() editedPost = new EventEmitter<Post>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  imagePreview: string | null = null;
  selectedImage: File | null = null;

  body: FormControl = new FormControl();
  privacy: FormControl = new FormControl();

  cancelEdit() {
    this.editCompleted.emit();
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
  deleteImage() {
    if (this.imagePreview && this.selectedImage) {
      URL.revokeObjectURL(this.imagePreview);
    }
    this.selectedImage = null;
    this.imagePreview = null;
    if (this.fileInput) this.fileInput.nativeElement.value = '';
    this.selectedImage = null;
  }

  editPost() {
    const formData = new FormData();
    formData.append('body', this.body.getRawValue() ?? '');
    formData.append('privacy', this.privacy.getRawValue());

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    } else {
    }
    this.postService.editPost(this.post._id, formData).subscribe({
      next: (res) => {
        const updatedPost: Post = {
          ...this.post,
          ...res.data.post,
          user: this.post.user,
        };
        console.log(updatedPost);

        this.editedPost.emit(updatedPost);
        this.editCompleted.emit();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
