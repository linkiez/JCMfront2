import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

const KEY = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  constructor() {}

  salvaToken(token: string) {
    localStorage.setItem(KEY, token);
    localStorage.setItem(
      'refreshTokenExpireIn',
      (
        moment.now() +
        environment.accessTokenExpirein * 24 * 60 * 60 * 1000
      ).toString()
    );
  }

  excluiToken() {
    localStorage.removeItem(KEY);
  }

  retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  possuiToken() {
    let now = moment.now();
    let refreshTokenExpireIn = Number(
      localStorage.getItem('refreshTokenExpireIn')
    );
    if (this.retornaToken()) {
      if (now < refreshTokenExpireIn) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
