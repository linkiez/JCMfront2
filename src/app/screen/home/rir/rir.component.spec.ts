import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RirComponent } from './rir.component';

describe('RirComponent', () => {
  let component: RirComponent;
  let fixture: ComponentFixture<RirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
