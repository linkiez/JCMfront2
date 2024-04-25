import { AccessTokenService } from './accessToken.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RefreshTokenService } from './refreshToken.service';
import { ILogin } from '../models/login';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

const API = environment.backendURL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private refreshTokenService: RefreshTokenService,
    private accessTokenService: AccessTokenService,
    private router: Router
  ) {}

  login(email: string, senha: string) {
    return this.httpClient.post(
      `${API}login`,
      { email: email, senha: senha },
      { observe: 'response' }
    );
  }

  logout() {
    return this.httpClient.get(`${API}logout`, { observe: 'response' });
  }

  refresh() {
    return this.httpClient.get(`${API}refresh`, {
      headers: { 'x-refresh-token': this.refreshTokenService.retornaToken() },
      observe: 'response',
    });
  }

  async verificaTokens() {
    const accessToken = this.accessTokenService.possuiToken();
    const refreshToken = this.refreshTokenService.possuiToken();
    if (accessToken) {
      return true;
    }
    if (refreshToken) {
      try {
        const response = await firstValueFrom(this.refresh());
        const body = response.body as ILogin;
        if (body) {
          this.accessTokenService.salvaToken(body!.accessToken);
          this.refreshTokenService.salvaToken(body!.refreshToken);
          return true;
        }
      } catch (error: any) {
        console.log(error);
      }
      this.router.navigate(['login']);
      return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
