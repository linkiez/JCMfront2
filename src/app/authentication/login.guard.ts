import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccessTokenService } from './accessToken.service';
import { AuthenticationService } from './authentication.service';
import { RefreshTokenService } from './refreshToken.service';
import { UsuarioService } from 'src/app/authentication/usuario.service';
import { ILogin } from '../models/login';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate, CanLoad {
  constructor(private authenticationService: AuthenticationService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationService.verificaTokens();
  }

  canActivate(): Promise<boolean> {
    return this.authenticationService.verificaTokens();
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.verificaTokens();
  }
}
