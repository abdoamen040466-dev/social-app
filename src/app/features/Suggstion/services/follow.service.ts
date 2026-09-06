import { ToggleFollowResponse } from './../models/toggle-follow-response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { GetSuggestedResponse } from '../models/get-suggested-response';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private readonly httpClient = inject(HttpClient);

  getFollowSuggestion(): Observable<GetSuggestedResponse> {
    return this.httpClient.get<GetSuggestedResponse>(
      `${environment.apiUrl}/users/suggestions?limit=5`,
    );
  }

  toggleFollow(userId: string): Observable<ToggleFollowResponse> {
    return this.httpClient.put<ToggleFollowResponse>(
      `${environment.apiUrl}/users/${userId}/follow`,
      {},
    );
  }
}
