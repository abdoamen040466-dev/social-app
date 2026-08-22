import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../../home/models/get-all-posts-response';
import { Component, ElementRef, HostListener, inject, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-post-header',
  imports: [],
  templateUrl: './post-header.component.html',
  styleUrl: './post-header.component.css',
})
export class PostHeaderComponent {
  private readonly postService = inject(PostService);
  private readonly authService = inject(AuthStorageService);

  @Input() post!: Post;
  @Input() isShared!: boolean;
  @ViewChild('menu') menu!: ElementRef;

  isMenuOpened: boolean = false;

  savePost(): void {
    this.postService.savePost(this.post._id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sharePost(): void {
    this.postService.sharePost(this.post._id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePost(): void {
    this.postService.deletePost(this.post._id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isOwner(): boolean {
    return this.post.user._id === this.authService.getUser()?._id;
  }

  @HostListener('document:click', ['$event']) onClick(evenet: MouseEvent) {
    const target = evenet.target as Node;
    if (this.menu.nativeElement.contains(target)) {
      this.isMenuOpened = !this.isMenuOpened;
    } else {
      this.isMenuOpened = false;
    }
  }
}
