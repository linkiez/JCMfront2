import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaComponent } from './pessoa.component';
import { AppModule } from 'src/app/app.module';
import { PessoasModule } from '../pessoas.module';

describe('PessoaComponent', () => {
  let component: PessoaComponent;
  let fixture: ComponentFixture<PessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, PessoasModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
