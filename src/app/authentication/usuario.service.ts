import { firstValueFrom } from 'rxjs';
import { UsuarioServiceDB } from 'src/app/services/usuarioDB.service';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { AccessTokenService } from './accessToken.service';
import { RefreshTokenService } from './refreshToken.service';
import { IUsuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuario: IUsuario = null;

  constructor(
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
    private authenticationService: AuthenticationService,
    private usuarioServiceDB: UsuarioServiceDB
  ) {
    if (this.accessTokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private async decodificaJWT() {
    const token = this.accessTokenService.retornaToken();
    const { id } = jwtDecode(token) as { id: number };
    if(!this.usuario)
    this.usuario = await firstValueFrom(this.usuarioServiceDB.getUsuario(id))
  }

  getUsuario() {
    return this.usuario;
  }

  async salvaToken(accesstoken: string, refreshToken: string) {
    this.accessTokenService.salvaToken(accesstoken);
    this.refreshTokenService.salvaToken(refreshToken);
    await this.decodificaJWT();
  }

  estaLogado() {
    return this.accessTokenService.possuiToken();
  }

  logout() {
    this.authenticationService.logout();
    this.accessTokenService.excluiToken();
    this.refreshTokenService.excluiToken();
    this.usuario = null;
  }
}
