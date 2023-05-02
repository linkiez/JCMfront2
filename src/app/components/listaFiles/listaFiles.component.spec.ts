/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListaFilesComponent } from './listaFiles.component';
import { AppModule } from 'src/app/app.module';
import { ListaFilesModule } from './listaFiles.module';

describe('ListaFilesComponent', () => {
  let component: ListaFilesComponent;
  let fixture: ComponentFixture<ListaFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ListaFilesModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
