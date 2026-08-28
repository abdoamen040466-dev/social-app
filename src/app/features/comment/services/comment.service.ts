import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ToggleLikeCommentResponse } from '../models/toggle-like-response';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly httpClient = inject(HttpClient);

  toggleLikeComment(postId: string, commentId: string): Observable<ToggleLikeCommentResponse> {
    return this.httpClient.put<ToggleLikeCommentResponse>(
      `${environment.apiUrl}/posts/${postId}/comments/${commentId}/like`,
      {},
    );
  }
}
