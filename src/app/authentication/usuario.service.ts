import { BehaviorSubject, firstValueFrom, Observable, Subscription } from 'rxjs';
import { UsuarioServiceDB } from 'src/app/services/usuarioDB.service';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from './authentication.service';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AccessTokenService } from './accessToken.service';
import { RefreshTokenService } from './refreshToken.service';
import { IUsuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements OnInit, OnDestroy {
  userBehaviorSubject: BehaviorSubject<IUsuario> = new BehaviorSubject<IUsuario>(null);
  user$: Observable<IUsuario> = this.userBehaviorSubject.asObservable();
  userSubscription: Subscription;
  usuario: IUsuario = null;

  constructor(
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
    private authenticationService: AuthenticationService,
    private usuarioServiceDB: UsuarioServiceDB
  ) {
    if (this.accessTokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  ngOnInit(): void {
    this.userSubscription = this.user$.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
  }

  private async decodificaJWT() {
    const token = this.accessTokenService.retornaToken();
    const { id } = jwtDecode(token) as { id: number };
    if (!this.usuario) {
      const usuario = await firstValueFrom(
        this.usuarioServiceDB.getUsuario(id)
      );
      this.userBehaviorSubject.next(usuario);
    }
  }

  getUsuario$() {
    return this.user$;
  }

  async salvaToken(accesstoken: string, refreshToken: string) {
    this.accessTokenService.salvaToken(accesstoken);
    this.refreshTokenService.salvaToken(refreshToken);
    await this.decodificaJWT();
  }

  estaLogado() {
    return this.accessTokenService.possuiToken();
  }

  logout() {
    this.authenticationService.logout();
    this.accessTokenService.excluiToken();
    this.refreshTokenService.excluiToken();
    this.userBehaviorSubject.next(null);
  }
}
