import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.data = {
      img: 'test-image.jpg',
      textLink: 'Test Link',
      title: 'Test Title',
      desc: ['Test Description']
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
