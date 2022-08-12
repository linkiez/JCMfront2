import { AccessTokenService } from './accessToken.service';
import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API = environment.backendURL;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private accessTokenService: AccessTokenService
  ) {}

  login(email: string, senha: string) {
    return this.httpClient.post(
      `${API}/login`,
      { email: email, senha: senha },
      { observe: 'response' }
    );
  }

  logout() {
    return this.httpClient.get(`${API}/login`, { observe: 'response' });
  }
}
