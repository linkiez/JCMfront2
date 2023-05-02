import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { AppModule } from '../app.module';

describe('UserService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
