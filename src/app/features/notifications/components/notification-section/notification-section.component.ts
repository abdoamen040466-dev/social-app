import { Component, inject, Input, signal } from '@angular/core';
import { NotificationCardComponent } from '../notification-card/notification-card.component';
import { NotificationsService } from '../../services/notifications.service';
import { Notification } from '../../models/get-notifications-response';

@Component({
  selector: 'app-notification-section',
  imports: [NotificationCardComponent],
  templateUrl: './notification-section.component.html',
  styleUrl: './notification-section.component.css',
})
export class NotificationSectionComponent {
  ngOnInit(): void {
    this.getAllNotifications();
  }
  private readonly notificationsService = inject(NotificationsService);
  notifications = signal<Notification[]>([]);
  showUnreadOnly = signal<boolean>(false);

  showUnread() {
    this.showUnreadOnly.set(true);
  }

  showAll() {
    this.showUnreadOnly.set(false);
  }

  markAllAsRead() {
    this.notifications.update((notifications) =>
      notifications.map((noti) => ({
        ...noti,
        isRead: true,
      })),
    );
  }

  getAllNotifications() {
    this.notificationsService.getAllNotifications().subscribe({
      next: (res) => {
        console.log(res);
        this.notifications.set(res.data.notifications);
      },
    });
  }
}
