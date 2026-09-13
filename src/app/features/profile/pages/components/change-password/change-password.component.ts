import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ChangePasswordRequest } from '../../../models/change-password-request';
import { AuthStorageService } from '../../../../../core/auth/services/auth-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly profileService = inject(ProfileService);
  private readonly authStorageService = inject(AuthStorageService);
  private readonly toast = inject(ToastrService);

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  // passwordForm =  new FormControl()
  readonly passwordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
    ]),
  });

  changePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.profileService
      .changePassword(this.passwordForm.getRawValue() as ChangePasswordRequest)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.authStorageService.saveToken(res.data.token);
          this.toast.success('Password Changes Successfully', 'Change Password', {
            closeButton: true,
          });
        },
        error: (err) => {
          this.toast.error(err.error?.message ?? 'Something went wrong', 'Change Password', {
            closeButton: true,
          });
        },
      });
  }
}
