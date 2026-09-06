import { Component, inject, Input, signal } from '@angular/core';
import { Suggestion } from '../../models/get-suggested-response';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-friend-card',
  imports: [],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css',
})
export class FriendCardComponent {
  private readonly followService = inject(FollowService);

  followed = signal<boolean>(false);

  @Input() friend!: Suggestion;

  toggleFollow() {
    this.followService.toggleFollow(this.friend._id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.data.following) {
          this.followed.set(true);
          this.friend.followersCount += 1;
        } else {
          this.followed.set(false);
          this.friend.followersCount -= 1;
        }
      },
    });
  }
}
