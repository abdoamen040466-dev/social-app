import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AllPostsResponse } from '../models/get-all-posts-response';
import { environment } from '../../../../environments/environment.development';
import { AuthStorageService } from '../../../core/auth/services/auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly httpClient = inject(HttpClient);
  private readonly authStorageService = inject(AuthStorageService);

  header: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.authStorageService.getToken()}`,
  });

  getAllPosts(): Observable<AllPostsResponse> {
    return this.httpClient.get<AllPostsResponse>(`${environment.apiUrl}/posts`, {
      headers: this.header,
    });
  }
}
