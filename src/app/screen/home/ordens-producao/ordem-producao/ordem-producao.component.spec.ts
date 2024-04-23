/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrdemProducaoComponent } from './ordem-producao.component';
import { AppModule } from 'src/app/app.module';
import { OrdensProducaoModule } from '../ordens-producao.module';

describe('OrdemProducaoComponent', () => {
  let component: OrdemProducaoComponent;
  let fixture: ComponentFixture<OrdemProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrdensProducaoModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
