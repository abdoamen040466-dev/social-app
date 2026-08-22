import { Component, inject, Input, signal } from '@angular/core';
import { Post } from '../../../home/models/get-all-posts-response';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-footer',
  imports: [],
  templateUrl: './post-footer.component.html',
  styleUrl: './post-footer.component.css',
})
export class PostFooterComponent {
  private readonly authService = inject(AuthStorageService);
  private readonly postService = inject(PostService);

  @Input() post!: Post;
  ngOnInit(): void {
    this.liked.set(this.userLiked());
  }

  liked = signal<boolean>(false);
  userId: string | undefined = this.authService.getUser()?._id;

  userLiked(): boolean {
    if (!this.userId) {
      return false;
    }
    return this.post.likes.includes(this.userId);
  }

  toggleLike() {
    this.postService.Togglelike(this.post._id).subscribe({
      next: (res) => {
        if (res.data.liked) {
          this.post.likesCount += 1;
          if (this.userId) {
            this.post.likes.push(this.userId);
          }
          this.liked.set(true);
        } else {
          this.post.likesCount -= 1;
          this.liked.set(false);
          if (this.userId) {
            this.post.likes.splice(this.post.likes.indexOf(this.userId), 1);
          }
        }
      },
    });
  }
}
