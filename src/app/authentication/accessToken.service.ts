import { Injectable } from '@angular/core';

const KEY = 'accessToken'

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

  constructor() { }

  salvaToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  excluiToken() {
    localStorage.removeItem(KEY);
  }

  retornaToken(){
    return localStorage.getItem(KEY) ?? '';
  }

  possuiToken(){
    return !! this.retornaToken();
  }
}
