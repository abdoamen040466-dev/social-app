import { Component, inject, OnInit, signal } from '@angular/core';
import { FriendCardComponent } from '../friend-card/friend-card.component';
import { FollowService } from '../../services/follow.service';
import { Suggestion } from '../../models/get-suggested-response';

@Component({
  selector: 'app-suggestion',
  imports: [FriendCardComponent],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css',
})
export class SuggestionComponent implements OnInit {
  private readonly suggestionService = inject(FollowService);

  ngOnInit(): void {
    this.getSuggestedfriend();
  }

  friends = signal<Suggestion[]>([]);

  search(text: string) {}

  getSuggestedfriend() {
    this.suggestionService.getFollowSuggestion().subscribe({
      next: (res) => {
        this.friends.set(res.data.suggestions);
        console.log(res);
      },
    });
  }
}
