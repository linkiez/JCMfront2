import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNCsComponent } from './rncs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

describe('RNCsComponent', () => {
  let component: RNCsComponent;
  let fixture: ComponentFixture<RNCsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RNCsComponent],
      imports: [HttpClientTestingModule],
      providers: [MessageService],
    });
    fixture = TestBed.createComponent(RNCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
