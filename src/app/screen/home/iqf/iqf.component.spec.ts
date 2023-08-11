import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqfComponent } from './iqf.component';

describe('IqfComponent', () => {
  let component: IqfComponent;
  let fixture: ComponentFixture<IqfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IqfComponent]
    });
    fixture = TestBed.createComponent(IqfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
