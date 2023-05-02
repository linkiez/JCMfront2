import { TestBed } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { AppModule } from '../app.module';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
