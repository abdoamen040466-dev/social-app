import { HomeService } from './../../services/home.service';
import { Component, inject, OnInit, signal } from '@angular/core';

import { PostComponent } from '../../components/post/Postcomponents/normalPost/post.component';
import { Post } from '../../models/get-all-posts-response';
import { SharedPostComponent } from '../../components/post/Postcomponents/shared-post/shared-post.component';

@Component({
  selector: 'app-home',
  imports: [PostComponent, SharedPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly homeService = inject(HomeService);

  posts = signal<Post[]>([]);

  ngOnInit(): void {
    this.homeService.getAllPosts().subscribe({
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
