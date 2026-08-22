import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStorageService } from '../auth/services/auth-storage.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthStorageService).getToken();
  const authService = inject(AuthService);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.signout();
      }
      return throwError(() => error);
    }),
  );
};
