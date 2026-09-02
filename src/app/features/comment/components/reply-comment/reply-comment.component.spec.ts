import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCommentComponent } from './reply-comment.component';

describe('ReplyCommentComponent', () => {
  let component: ReplyCommentComponent;
  let fixture: ComponentFixture<ReplyCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplyCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReplyCommentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
