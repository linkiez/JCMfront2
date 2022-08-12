import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessTokenService } from './accessToken.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  constructor(
    private router: Router,
    private accessTokenService: AccessTokenService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if(this.accessTokenService.possuiToken()) return true;

      this.router.navigate(['login'])
      return false
  }
}
