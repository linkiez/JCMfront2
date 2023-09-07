import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSaibaMaisComponent } from './button-saiba-mais.component';

describe('ButtonSaibaMaisComponent', () => {
  let component: ButtonSaibaMaisComponent;
  let fixture: ComponentFixture<ButtonSaibaMaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonSaibaMaisComponent]
    });
    fixture = TestBed.createComponent(ButtonSaibaMaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
