import { TestBed } from '@angular/core/testing';

import { UsuarioServiceDB } from './usuario.service';
import { AppModule } from '../app.module';

describe('UsuarioService', () => {
  let service: UsuarioServiceDB;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(UsuarioServiceDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
