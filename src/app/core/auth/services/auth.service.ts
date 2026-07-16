import { RegisterResponse } from './../../../features/auth/models/register-response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../../../features/auth/models/register-request';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../../features/auth/models/login-request';
import { LoginResponse } from '../../../features/auth/models/login-response';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  register(registerForm: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/users/signup`, registerForm);
  }

  login(loginForm: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/users/signin`, loginForm);
  }
}
