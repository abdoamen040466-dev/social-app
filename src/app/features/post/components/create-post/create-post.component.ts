import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../../home/models/get-all-posts-response';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postService = inject(PostService);
  readonly user = inject(AuthStorageService).getUser();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() childEvent = new EventEmitter<Post>();

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  postForm = new FormGroup({
    privacy: new FormControl('public'),
    body: new FormControl('', [Validators.required]),
  });

  get form() {
    return this.postForm.controls;
  }
  submitted: boolean = false;

  createPost() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      this.submitted = true;
      return;
    }

    const post = this.postForm.getRawValue();
    const formData = new FormData();
    formData.append('body', post.body ?? '');
    formData.append('privacy', post.privacy ?? 'public');
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.postService.createPost(formData).subscribe({
      next: (res) => {
        if (this.imagePreview) {
          URL.revokeObjectURL(this.imagePreview);
        }
        this.selectedImage = null;
        this.imagePreview = null;
        this.fileInput.nativeElement.value = '';
        this.postForm.reset({
          body: '',
          privacy: 'public',
        });
        // this.childEvent.emit(res.data.post);

        console.log(res);
        this.getPost(res.data.post._id);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }
    this.selectedImage = null;
    this.imagePreview = null;
    this.fileInput.nativeElement.value = '';
  }

  getPost(postId: string) {
    this.postService.getPost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.childEvent.emit(res.data.post);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
