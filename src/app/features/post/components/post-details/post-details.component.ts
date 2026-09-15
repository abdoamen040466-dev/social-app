import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PostComponent } from '../normal-post/post.component';
import { Post } from '../../../home/models/get-all-posts-response';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-details',
  imports: [PostComponent],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.getPost();
  }
  private readonly route = inject(ActivatedRoute);
  private readonly postService = inject(PostService);

  post = signal<Post>(null!);

  id: string = this.route.snapshot.paramMap.get('id')!;

  getPost() {
    this.postService.getPost(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.post.set(res.data.post);
      },
    });
  }
}
