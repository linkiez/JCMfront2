import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoComponent } from './contato.component';
import { ContatoModule } from './contato.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContatoSiteComponent', () => {
  let component: ContatoComponent;
  let fixture: ComponentFixture<ContatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContatoComponent],
      imports: [ContatoModule, HttpClientTestingModule
      ],
      providers: []
    });
    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
