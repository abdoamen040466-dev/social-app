import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { GetMyprofileResponse } from '../models/get-myprofile-response';
import { GetBookmarks } from '../models/get-bookmarks';
import { GetMyPosts } from '../models/get-my-posts';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);

  getMyProfile(): Observable<GetMyprofileResponse> {
    return this.httpClient.get<GetMyprofileResponse>(`${environment.apiUrl}/users/profile-data`);
  }

  getUserPosts(userId: string): Observable<GetMyPosts> {
    return this.httpClient.get<GetMyPosts>(`${environment.apiUrl}/users/${userId}/posts`);
  }

  getBookMarks(): Observable<GetBookmarks> {
    return this.httpClient.get<GetBookmarks>(`${environment.apiUrl}/users/bookmarks`);
  }
}
