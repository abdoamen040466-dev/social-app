import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPostsResponse } from '../models/user-posts-response';
import { environment } from '../../../../environments/environment.development';
import { UserProfileResponse } from '../models/user-profile-response';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly httpClient = inject(HttpClient);

  GetUserPosts(userId: string): Observable<UserPostsResponse> {
    return this.httpClient.get<UserPostsResponse>(`${environment.apiUrl}/users/${userId}/posts`);
  }

  getUserProfile(userId: string): Observable<UserProfileResponse> {
    return this.httpClient.get<UserProfileResponse>(
      `${environment.apiUrl}/users/${userId}/profile`,
    );
  }
}
