import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

const KEY = 'accessToken';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenService {
  constructor() {}

  salvaToken(token: string) {
    localStorage.setItem(KEY, token);

    localStorage.setItem(
      'accessTokenExpireIn',
      (moment.now()+(environment.accessTokenExpirein*60*1000)).toString()
    );
  }
  excluiToken() {
    localStorage.removeItem(KEY);
  }

  retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  possuiToken() {
    const now = moment.now();
    const accessTokenExpireIn = Number(
      localStorage.getItem('accessTokenExpireIn')
    );

    if (this.retornaToken()) {
      if (now < accessTokenExpireIn) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
