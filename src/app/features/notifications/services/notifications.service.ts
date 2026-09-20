import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetNotificationsResponse } from '../models/get-notifications-response';
import { environment } from '../../../../environments/environment.development';
import { MarkNotificationAsReadResponse } from '../models/mark-notification-as-read-response';
import { UnreadCountsResponse } from '../models/unread-counts-response';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly httpClient = inject(HttpClient);

  getAllNotifications(): Observable<GetNotificationsResponse> {
    return this.httpClient.get<GetNotificationsResponse>(`${environment.apiUrl}/notifications`);
  }

  markNotificationAsRead(notificationId: string): Observable<MarkNotificationAsReadResponse> {
    return this.httpClient.patch<MarkNotificationAsReadResponse>(
      `${environment.apiUrl}/notifications/${notificationId}/read`,
      {},
    );
  }

  markAllAsRead(): Observable<MarkNotificationAsReadResponse> {
    return this.httpClient.patch<MarkNotificationAsReadResponse>(
      `${environment.apiUrl}/notifications/read-all`,
      {},
    );
  }

  getUnreadCount(): Observable<UnreadCountsResponse> {
    return this.httpClient.get<UnreadCountsResponse>(
      `${environment.apiUrl}/notifications/unread-count`,
    );
  }
}
