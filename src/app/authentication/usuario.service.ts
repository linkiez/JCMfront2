import { Usuario } from './usuario';
import { Injectable } from '@angular/core';
import { AccessTokenService } from './accessToken.service';
import { RefreshTokenService } from './refreshToken.service';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: Usuario = {}

  constructor(private accessTokenService: AccessTokenService, private refreshTokenService: RefreshTokenService, private authenticationSevice: AuthenticationService) {
    if(this.accessTokenService.possuiToken()){
      this.decodificaJWT();
    }
  }

  private decodificaJWT(){
    const token = this.accessTokenService.retornaToken()
    this.usuario = jwt_decode(token) as Usuario
  }

  getUsuario(){
    return this.usuario;
  }

  salvaToken(accesstoken: string, refreshToken: string){
    this.accessTokenService.salvaToken(accesstoken);
    this.refreshTokenService.salvaToken(refreshToken);
    this.decodificaJWT();
  }

  estaLogado(){
    return this.accessTokenService.possuiToken();
  }

  logout(){
    this.authenticationSevice.logout().subscribe();
    this.accessTokenService.excluiToken();
    this.refreshTokenService.excluiToken();
    this.usuario = {}
  }
}