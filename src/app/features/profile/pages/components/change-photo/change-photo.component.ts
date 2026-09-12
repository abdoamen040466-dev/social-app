import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { User } from '../../../models/get-myprofile-response';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-change-photo',
  imports: [],
  templateUrl: './change-photo.component.html',
  styleUrl: './change-photo.component.css',
})
export class ChangePhotoComponent {
  private readonly profileService = inject(ProfileService);

  @Input() user!: User;
  @Output() close = new EventEmitter<void>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() changePhoto = new EventEmitter<{ photo: string; postId: string }>();

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  uploadProfilePhoto() {
    if (!this.selectedImage) return;
    const formData = new FormData();
    formData.append('photo', this.selectedImage);
    this.profileService.uploadProfilePhoto(formData).subscribe({
      next: (res) => {
        this.changePhoto.emit({ photo: res.data.photo, postId: res.data.postId });
        this.closeModal();
      },
    });
  }

  closeModal() {
    this.close.emit();
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
}
