import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RirComponent } from './rir.component';
import { MessageService } from 'primeng/api';

describe('RirComponent', () => {
  let component: RirComponent;
  let fixture: ComponentFixture<RirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RirComponent ],
      imports: [HttpClientTestingModule],
      providers: [MessageService]
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
