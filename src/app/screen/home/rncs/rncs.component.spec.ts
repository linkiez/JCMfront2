import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNCsComponent } from './rncs.component';

describe('RNCsComponent', () => {
  let component: RNCsComponent;
  let fixture: ComponentFixture<RNCsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RNCsComponent]
    });
    fixture = TestBed.createComponent(RNCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
