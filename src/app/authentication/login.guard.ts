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
    private router: Router,
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.accessTokenService.possuiToken()) {
      return true;
    } else {
      if (this.refreshTokenService.possuiToken()) {
        this.authenticationService.refresh().subscribe({
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
    return false;
  }

  canActivate(): boolean{
    if (this.accessTokenService.possuiToken()) {
      return true;
    } else {
      if (this.refreshTokenService.possuiToken()) {
        this.authenticationService.refresh().subscribe({
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
    return false;
  }
}
