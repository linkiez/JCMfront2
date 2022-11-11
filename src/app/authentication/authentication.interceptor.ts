import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessTokenService } from './accessToken.service';
import { RefreshTokenService } from './refreshToken.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.verificaTokens() && request.url.includes(environment.backendURL)) {
      const accessToken = this.accessTokenService.retornaToken();
      const refreshToken = this.refreshTokenService.retornaToken();
      const headers = new HttpHeaders()
        .append('x-access-token', accessToken)
        .append('x-refresh-token', refreshToken);

      request = request.clone({ headers });
    }
    return next.handle(request);
  }
}
