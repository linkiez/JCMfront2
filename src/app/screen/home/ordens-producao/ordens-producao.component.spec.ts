/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrdensProducaoComponent } from './ordens-producao.component';
import { OrdensProducaoModule } from './ordens-producao.module';
import { AppModule } from 'src/app/app.module';

describe('OrdensProducaoComponent', () => {
  let component: OrdensProducaoComponent;
  let fixture: ComponentFixture<OrdensProducaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrdensProducaoModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdensProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
