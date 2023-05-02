/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaixaDeStatusComponent } from './caixaDeStatus.component';
import { AppModule } from 'src/app/app.module';
import { CaixaDeStatusModule } from './caixaDeStatus.module';

describe('CaixaDeStatusComponent', () => {
  let component: CaixaDeStatusComponent;
  let fixture: ComponentFixture<CaixaDeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, CaixaDeStatusModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaDeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
