import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ToggleLikeCommentResponse } from '../models/toggle-like-response';
import { CreateCommentResponse } from '../models/create-comment-response';

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

  createComment(postId: string, comment: FormData): Observable<CreateCommentResponse> {
    return this.httpClient.post<CreateCommentResponse>(
      `${environment.apiUrl}/posts/${postId}/comments`,
      comment,
    );
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/posts/${postId}/comments/${commentId}`);
  }
}
