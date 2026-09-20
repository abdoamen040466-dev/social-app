import { Component, inject, Input } from '@angular/core';
import { Notification } from '../../models/get-notifications-response';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-card',
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css',
})
export class NotificationCardComponent {
  private readonly router = inject(Router);
  private readonly notificationsService = inject(NotificationsService);
  @Input() notification!: Notification;

  getNotificationText(notification: Notification): string {
    switch (notification.type) {
      case 'like_post':
        return 'liked your post';

      case 'comment_post':
        return 'commented on your post';

      case 'share_post':
        return 'shared your post';

      case 'follow':
        return 'started following you';

      default:
        return 'interacted with your content';
    }
  }

  markNotificationAsRead() {
    if (this.notification.isRead) return;
    this.notificationsService.markNotificationAsRead(this.notification._id).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  goToPostOrComment() {
    if (this.notification.entityType === 'post')
      this.router.navigate(['/post', this.notification.entityId]);
    else this.router.navigate(['/post', this.notification.entity.post]);
  }
  clickNotification() {
    this.markNotificationAsRead();
    this.goToPostOrComment();
  }
}
