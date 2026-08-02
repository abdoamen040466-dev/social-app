import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthStorageService {
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');

    return user ? (JSON.parse(user) as User) : null;
  }

  clearStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
