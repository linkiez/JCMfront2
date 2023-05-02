import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoComponent } from './contato.component';
import { AppModule } from 'src/app/app.module';
import { CadastroContatosModule } from '../cadastro-contatos.module';

describe('ContatoComponent', () => {
  let component: ContatoComponent;
  let fixture: ComponentFixture<ContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, CadastroContatosModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
