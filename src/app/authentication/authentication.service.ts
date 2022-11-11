import { AccessTokenService } from './accessToken.service';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RefreshTokenService } from './refreshToken.service';
import { UsuarioService } from './usuario.service';
import { Login } from '../models/login';
import { Router } from '@angular/router';

const API = environment.backendURL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private refreshTokenService: RefreshTokenService,
    private accessTokenService: AccessTokenService,
    private usuarioService: UsuarioService,
    private router: Router,
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
      headers: {'x-refresh-token': this.refreshTokenService.retornaToken()},
      observe: 'response' })
  }

  verificaTokens(){
    if (this.accessTokenService.possuiToken()) {
      return true;
    } else {
      if (this.refreshTokenService.possuiToken()) {
        this.refresh().subscribe({
          next: (response) => {
            let body = response.body as Login;

            this.usuarioService.salvaToken(
              body!.accessToken,
              body!.refreshToken
            );
            return true;
          },
          error: (error) => {
            alert(error.message);
            console.log(error);
            this.router.navigate(['login']);
          },
        });
      } else {
        this.router.navigate(['login']);
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
