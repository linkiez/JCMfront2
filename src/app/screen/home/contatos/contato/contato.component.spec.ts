import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ContatoComponent } from './contato.component';
import { AppModule } from 'src/app/app.module';
import { ContatosModule } from '../contatos.module';

describe('ContatoComponent', () => {
  let component: ContatoComponent;
  let fixture: ComponentFixture<ContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, ContatosModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
