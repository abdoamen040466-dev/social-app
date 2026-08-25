import { HomeService } from './../../services/home.service';
import { Component, inject, OnInit, signal } from '@angular/core';

import { PostComponent } from '../../../post/components/normal-post/post.component';
import { Post } from '../../models/get-all-posts-response';
import { SharedPostComponent } from '../../../post/components/shared-post/shared-post.component';
import { CreatePostComponent } from '../../../post/components/create-post/create-post.component';

@Component({
  selector: 'app-home',
  imports: [PostComponent, SharedPostComponent, CreatePostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);

  posts = signal<Post[]>([]);

  addNewPost(post: Post) {
    this.posts.update((posts) => [post, ...posts]);
  }

  ngOnInit(): void {
    this.homeService.getAllPosts().subscribe({
      next: (res) => {
        this.posts.set(res.data.posts);
      },
    });
  }
}
