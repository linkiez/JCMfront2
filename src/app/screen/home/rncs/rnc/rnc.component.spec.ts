import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNCComponent } from './rnc.component';

describe('RNCComponent', () => {
  let component: RNCComponent;
  let fixture: ComponentFixture<RNCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RNCComponent]
    });
    fixture = TestBed.createComponent(RNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
