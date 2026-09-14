import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../profile/services/profile.service';
import { Post } from '../../../home/models/get-all-posts-response';
import { User } from '../../models/user-profile-response';
import { SharedPostComponent } from '../../../post/components/shared-post/shared-post.component';
import { PostComponent } from '../../../post/components/normal-post/post.component';
import { DatePipe } from '@angular/common';
import { UserProfileService } from '../../services/user-profile.service';
import { FollowService } from '../../../Suggstion/services/follow.service';

@Component({
  selector: 'app-user-profile',
  imports: [SharedPostComponent, PostComponent, DatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly profileService = inject(ProfileService);
  private readonly userProfileService = inject(UserProfileService);
  private readonly followService = inject(FollowService);

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserPosts();
  }

  toggleFollow() {
    this.followService.toggleFollow(this.id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.data.following) {
          this.isFollowing.set(true);
          this.user.update((u) => (u ? { ...u, followersCount: u.followersCount + 1 } : u));
        } else {
          this.isFollowing.set(false);
          this.user.update((u) => (u ? { ...u, followersCount: u.followersCount + 1 } : u));
        }
      },
    });
  }
  user = signal<User | null>(null);
  posts = signal<Post[]>([]);
  isFollowing = signal(false);
  id: string = this.route.snapshot.paramMap.get('id')!;

  getUserProfile() {
    if (!this.id) return;

    this.profileService.getUserProfile(this.id).subscribe({
      next: (res) => {
        this.user.set(res.data.user);
        this.isFollowing.set(res.data.isFollowing);
      },
    });
  }

  getUserPosts() {
    this.userProfileService.GetUserPosts(this.id!).subscribe({
      next: (res) => {
        console.log(res);
        this.posts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
