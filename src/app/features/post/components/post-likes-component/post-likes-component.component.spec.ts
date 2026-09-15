import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikesComponentComponent } from './post-likes-component.component';

describe('PostLikesComponentComponent', () => {
  let component: PostLikesComponentComponent;
  let fixture: ComponentFixture<PostLikesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostLikesComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostLikesComponentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
