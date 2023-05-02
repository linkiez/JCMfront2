import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComponent } from './usuario.component';
import { UsuariosModule } from '../usuarios.module';
import { AppModule } from 'src/app/app.module';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, UsuariosModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
