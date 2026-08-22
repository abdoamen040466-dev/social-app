import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthStorageService } from '../../../core/auth/services/auth-storage.service';
import { ToggleLikeResponse } from '../models/toggle-like-Response';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);
  private readonly authStorageService = inject(AuthStorageService);

  header: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.authStorageService.getToken()}`,
  });

  Togglelike(postId: string): Observable<ToggleLikeResponse> {
    return this.httpClient.put<ToggleLikeResponse>(
      `${environment.apiUrl}/posts/${postId}/like`,
      {},
      {
        headers: this.header,
      },
    );
  }

  savePost(postId: string): Observable<any> {
    return this.httpClient.put(
      `${environment.apiUrl}/posts/${postId}/bookmark`,
      {},
      {
        headers: this.header,
      },
    );
  }

  sharePost(postId: string): Observable<any> {
    return this.httpClient.post(
      `${environment.apiUrl}/posts/${postId}/share`,
      {},
      {
        headers: this.header,
      },
    );
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/posts/${postId}`, {
      headers: this.header,
    });
  }
}
