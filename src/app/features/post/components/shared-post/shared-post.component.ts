import { Component, Input } from '@angular/core';
import { PostComponent } from '../normalPost/post.component';
import { Post } from '../../../home/models/get-all-posts-response';
import { PostHeaderComponent } from '../post-header/post-header.component';
import { PostFooterComponent } from '../post-footer/post-footer.component';

@Component({
  selector: 'app-shared-post',
  imports: [PostComponent, PostHeaderComponent, PostFooterComponent],
  templateUrl: './shared-post.component.html',
  styleUrl: './shared-post.component.css',
})
export class SharedPostComponent {
  ngOnInit() {
    console.log('Shared Post:', this.post);
    console.log('Original Post:', this.post.sharedPost);
  }
  @Input() post!: Post;
}
