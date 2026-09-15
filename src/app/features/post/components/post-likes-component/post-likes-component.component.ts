import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Post } from '../../../home/models/get-all-posts-response';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { PostService } from '../../services/post.service';
import { User } from '../../../../core/models/user';
import { UserProfileService } from '../../../user-profile/services/user-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-likes-component',
  imports: [],
  templateUrl: './post-likes-component.component.html',
  styleUrl: './post-likes-component.component.css',
})
export class PostLikesComponentComponent implements OnInit {
  ngOnInit(): void {
    this.likedPost.set(this.userLiked());
    this.getLikedUsers();
  }
  private readonly postService = inject(PostService);
  private readonly authService = inject(AuthStorageService);
  private readonly userProfileService = inject(UserProfileService);
  private readonly router = inject(Router);

  @Input() showLikesUser: boolean = false;
  @Input() post!: Post;

  usersLikedPost = signal<User[]>([]);

  userId: string | undefined = this.authService.getUser()?._id;

  userLiked(): boolean {
    if (!this.userId) {
      return false;
    }
    return this.post.likes.includes(this.userId);
  }
  likedPost = signal<boolean>(false);

  toggleLikePost() {
    this.postService.Togglelike(this.post._id).subscribe({
      next: (res) => {
        if (res.data.liked) {
          this.post.likesCount += 1;
          if (this.userId) {
            this.post.likes.push(this.userId);
          }
          this.likedPost.set(true);
        } else {
          this.post.likesCount -= 1;
          this.likedPost.set(false);
          if (this.userId) {
            this.post.likes.splice(this.post.likes.indexOf(this.userId), 1);
          }
        }
      },
    });
  }

  getLikedUsers() {
    const likes = this.post.likes;
    for (const userId of likes) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (res) => {
          this.usersLikedPost.update((users) => [...users, res.data.user]);
        },
      });
    }
  }

  goToUserProfile(id: string) {
    this.router.navigate(['/profile', id]);
  }
}
