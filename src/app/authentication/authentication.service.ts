import { AccessTokenService } from './accessToken.service';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RefreshTokenService } from './refreshToken.service';

const API = environment.backendURL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private refreshTokenService: RefreshTokenService
  ) {}

  login(email: string, senha: string) {
    return this.httpClient.post(
      `${API}login`,
      { email: email, senha: senha },
      { observe: 'response' }
    );
  }

  logout() {
    return this.httpClient.get(`${API}/login`, { observe: 'response' });
  }

  refresh() {
    return this.httpClient.get(`${API}refresh`, {
      headers: {'x-refresh-token': this.refreshTokenService.retornaToken()},
      observe: 'response' })
  }
}
