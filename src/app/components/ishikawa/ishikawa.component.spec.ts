import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshikawaComponent } from './ishikawa.component';

describe('IshikawaComponent', () => {
  let component: IshikawaComponent;
  let fixture: ComponentFixture<IshikawaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IshikawaComponent]
    });
    fixture = TestBed.createComponent(IshikawaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
