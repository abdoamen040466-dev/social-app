import { Component, inject, Input, signal } from '@angular/core';
import { Post } from '../../../../models/get-all-posts-response';
import { AuthStorageService } from '../../../../../../core/auth/services/auth-storage.service';
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

  userLiked(): boolean {
    const userId = this.authService.getUser()?._id;
    if (!userId) {
      return false;
    }
    return this.post.likes.includes(userId);
  }

  toggleLike() {
    this.postService.TogglelikePost(this.post._id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.data.liked) {
          this.post.likesCount += 1;
          this.liked.set(true);
        } else {
          this.post.likesCount -= 1;
          this.liked.set(false);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
