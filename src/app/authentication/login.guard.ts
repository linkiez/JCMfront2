import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessTokenService } from './accessToken.service';
import { AuthenticationService } from './authentication.service';
import { RefreshTokenService } from './refreshToken.service';
import { UsuarioService } from 'src/app/authentication/usuario.service';
import { Login } from '../screen/login/login';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
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
      console.log(this.accessTokenService.possuiToken())
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
            alert('refresh token invalido');
            console.log(error);
          },
        });
      } else {
        this.router.navigate(['login']);
      }
    }
    return false;
  }
}
