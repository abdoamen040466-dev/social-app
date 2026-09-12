import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/get-myprofile-response';
import { Post } from '../../../home/models/get-all-posts-response';
import { PostComponent } from '../../../post/components/normal-post/post.component';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { SharedPostComponent } from '../../../post/components/shared-post/shared-post.component';
import { ChangePhotoComponent } from '../components/change-photo/change-photo.component';
import { HomeService } from '../../../home/services/home.service';
import { PostService } from '../../../post/services/post.service';

@Component({
  selector: 'app-profile',
  imports: [PostComponent, SharedPostComponent, ChangePhotoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly postService = inject(PostService);
  private readonly authStorageService = inject(AuthStorageService);

  ngOnInit(): void {
    this.getMyProfile();
    this.getMyPosts();
    this.getMyBookmarks();
  }

  profile = signal<User | null>(null);
  myPosts = signal<Post[]>([]);
  bookmarks = signal<Post[]>([]);

  postCounter = signal<number | null>(null);
  bookmarkCounter = signal<number | null>(null);

  posts = signal<Post[]>([]);
  activeTab = signal<'posts' | 'bookmarks'>('posts');

  imageClicked: boolean = false;

  getMyProfile() {
    this.profileService.getMyProfile().subscribe({
      next: (res) => {
        this.profile.set(res.data.user);
      },
    });
  }

  getMyPosts() {
    const id = this.authStorageService.getUser()?._id;
    if (id)
      this.profileService.getUserPosts(id).subscribe({
        next: (res) => {
          this.myPosts.set(res.data.posts);
          this.posts.set(res.data.posts);
          this.postCounter.set(res.data.posts.length);
        },
      });
  }

  getMyBookmarks() {
    this.profileService.getBookMarks().subscribe({
      next: (res) => {
        this.bookmarks.set(res.data.bookmarks);
        this.bookmarkCounter.set(res.data.bookmarks.length);
      },
    });
  }

  showMyPosts() {
    this.posts.set(this.myPosts());
    this.activeTab.set('posts');
  }

  showMyBookmarks() {
    this.posts.set(this.bookmarks());
    this.activeTab.set('bookmarks');
  }

  getPost(id: string) {
    this.postService.getPost(id).subscribe({
      next: (res) => {
        const post = res.data.post;
        this.myPosts.update((posts) => [post, ...posts]);
      },
    });
  }
  changePhoto(photo: { photo: string; postId: string }) {
    this.profile.update((profile) => (profile ? { ...profile, photo: photo.photo } : profile));
    this.getPost(photo.postId);
  }
}
