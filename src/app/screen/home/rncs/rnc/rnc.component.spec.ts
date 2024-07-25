import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter, Routes } from '@angular/router';

import { RNCComponent } from './rnc.component';
import { MessageService } from 'primeng/api';

describe('RNCComponent', () => {
  let component: RNCComponent;
  let fixture: ComponentFixture<RNCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RNCComponent],
      imports: [HttpClientTestingModule,],
      providers: [MessageService, provideRouter([])],
    });
    fixture = TestBed.createComponent(RNCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
