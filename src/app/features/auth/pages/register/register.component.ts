import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMatcher } from '../../validators/password-match.validator';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { RegisterRequest } from '../../models/register-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toaster = inject(ToastrService);

  isLoading: boolean = false;

  readonly registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9_]+'),
        Validators.maxLength(30),
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      ]),
      rePassword: new FormControl('', [Validators.required /*, Validators*/]),
    },
    { validators: passwordMatcher, updateOn: 'blur' },
  );

  get input() {
    return this.registerForm.controls;
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.authService.register(this.registerForm.getRawValue() as RegisterRequest).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toaster.success('Account Added Sucessfuly', 'Register', {
          closeButton: true,
        });

        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}
