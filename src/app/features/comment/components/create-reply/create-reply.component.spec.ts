import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReplyComponent } from './create-reply.component';

describe('CreateReplyComponent', () => {
  let component: CreateReplyComponent;
  let fixture: ComponentFixture<CreateReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReplyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReplyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
