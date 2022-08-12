import { Injectable } from '@angular/core';

const KEY = 'refreshToken'

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

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
