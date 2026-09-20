import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { NotificationSectionComponent } from '../../components/notification-section/notification-section.component';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  imports: [NotificationSectionComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  ngOnInit(): void {
    this.getUnreadCount();
  }
  private readonly notificationsService = inject(NotificationsService);

  @ViewChild(NotificationSectionComponent)
  notificationSection!: NotificationSectionComponent;

  activeTab: 'all' | 'unread' = 'all';

  unReadCount = signal<number>(0);

  showUnRead() {
    this.notificationSection.showUnread();
    this.activeTab = 'unread';
  }
  showAll() {
    this.notificationSection.showAll();
    this.activeTab = 'all';
  }

  getUnreadCount() {
    this.notificationsService.getUnreadCount().subscribe({
      next: (res) => {
        console.log(res);
        this.unReadCount.set(res.data.unreadCount);
      },
    });
  }

  markAllAsRead() {
    this.notificationsService.markAllAsRead().subscribe({
      next: (res) => {
        console.log(res);
        this.unReadCount.set(0);
        this.notificationSection.markAllAsRead();
      },
    });
  }
}
