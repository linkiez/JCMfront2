import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication.interceptor';
import { AppModule } from '../app.module';

describe('AuthenticationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule],
    providers: [
      AuthenticationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthenticationInterceptor = TestBed.inject(AuthenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
