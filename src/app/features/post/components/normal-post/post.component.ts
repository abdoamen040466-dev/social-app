import { Post } from '../../../home/models/get-all-posts-response';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthStorageService } from '../../../../core/auth/services/auth-storage.service';
import { PostHeaderComponent } from '../post-header/post-header.component';
import { PostFooterComponent } from '../post-footer/post-footer.component';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-post',
  imports: [PostHeaderComponent, PostFooterComponent, EditPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  private readonly authService = inject(AuthStorageService);
  private readonly postService = inject(PostService);

  @Input() post!: Post;
  @Input() footerFlag: boolean = true;
  @Input() fullWidth: boolean = false;
  @Input() showLikesUser: boolean = false;

  @Output() postShared = new EventEmitter<Post>();
  @Output() PostDeletedId = new EventEmitter<string>();

  editing = signal<boolean>(false);

  addSharedPost(post: Post): void {
    this.postShared.emit(post);
  }

  SendDeletedPostId(id: string): void {
    this.PostDeletedId.emit(id);
  }
}
