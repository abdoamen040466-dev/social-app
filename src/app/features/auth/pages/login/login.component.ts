import { LoginRequest } from './../../models/login-request';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly authStorage = inject(AuthStorageService);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get input() {
    return this.loginForm.controls;
  }

  submitLogin() {
    this.errorMessage.set(null);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this.authService.login(this.loginForm.getRawValue() as LoginRequest).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.authStorage.saveToken(res.data.token);
        this.authStorage.saveUser(res.data.user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('incorrect email or password');
      },
    });
  }
}
