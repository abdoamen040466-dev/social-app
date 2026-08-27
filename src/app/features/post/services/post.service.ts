import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ToggleLikeResponse } from '../models/toggle-like-Response';
import { CreatePostResponse } from '../models/create-post-response';
import { GetSinglePost } from '../models/get-single-post';
import { SharePostResponse } from '../models/share-post-response';
import { DeletePostResponse } from '../models/delete-post-response';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);

  Togglelike(postId: string): Observable<ToggleLikeResponse> {
    return this.httpClient.put<ToggleLikeResponse>(
      `${environment.apiUrl}/posts/${postId}/like`,
      {},
    );
  }

  savePost(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/posts/${postId}/bookmark`, {});
  }

  sharePost(postId: string): Observable<SharePostResponse> {
    return this.httpClient.post<SharePostResponse>(
      `${environment.apiUrl}/posts/${postId}/share`,
      {},
    );
  }

  deletePost(postId: string): Observable<DeletePostResponse> {
    return this.httpClient.delete<DeletePostResponse>(`${environment.apiUrl}/posts/${postId}`);
  }
  createPost(post: FormData): Observable<CreatePostResponse> {
    return this.httpClient.post<CreatePostResponse>(`${environment.apiUrl}/posts`, post);
  }

  getPost(postId: string): Observable<GetSinglePost> {
    return this.httpClient.get<GetSinglePost>(`${environment.apiUrl}/posts/${postId}`);
  }
}
