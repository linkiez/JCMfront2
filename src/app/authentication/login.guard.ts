import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessTokenService } from './accessToken.service';
import { AuthenticationService } from './authentication.service';
import { RefreshTokenService } from './refreshToken.service';
import { UsuarioService } from 'src/app/authentication/usuario.service';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad, CanActivate  {
  constructor(
    private authenticationService: AuthenticationService,
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      return this.authenticationService.verificaTokens()
  }

  canActivate(): Promise<boolean>{
    return this.authenticationService.verificaTokens()
  }
}
