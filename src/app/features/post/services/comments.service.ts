import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { GetAllCommentsResponse } from '../models/get-all-comments-response';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getAllComments(id: string): Observable<GetAllCommentsResponse> {
    return this.httpClient.get<GetAllCommentsResponse>(
      `${environment.apiUrl}/posts/${id}/comments`,
    );
  }
}
