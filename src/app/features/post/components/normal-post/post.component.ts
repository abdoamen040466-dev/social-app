import { Post } from '../../../home/models/get-all-posts-response';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { PostHeaderComponent } from '../post-header/post-header.component';
import { PostFooterComponent } from '../post-footer/post-footer.component';

@Component({
  selector: 'app-post',
  imports: [PostHeaderComponent, PostFooterComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  private readonly authService = inject(AuthStorageService);
  private readonly postService = inject(PostService);

  @Input() post!: Post;
  @Input() footerFlag: boolean = true;
}
