import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

  constructor() { }

  salvaToken(token: string) {
    localStorage.setItem('token', token);
  }

  excluiToken() {
    localStorage.removeItem('token');
  }

  retornaToken(){
    return localStorage.getItem('token') ?? '';
  }

  possuiToken(){
    return !! this.retornaToken();
  }
}
