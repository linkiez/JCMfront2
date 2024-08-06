import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  Subscription,
} from 'rxjs';
import { UsuarioServiceDB } from 'src/app/services/usuarioDB.service';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from './authentication.service';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AccessTokenService } from './accessToken.service';
import { RefreshTokenService } from './refreshToken.service';
import { IUsuario } from '../models/usuario';
import { GlobalMessageHandler } from '../services/global-error-handler.service';
import {
  NestedAccessKey,
  verifyUserAccess,
} from '../authentication/access.guard';
import { IUsuarioAcesso } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements OnInit, OnDestroy {
  userBehaviorSubject: BehaviorSubject<IUsuario> =
    new BehaviorSubject<IUsuario>(null);
  user$: Observable<IUsuario> = this.userBehaviorSubject.asObservable();
  userSubscription: Subscription;
  usuario: IUsuario = null;

  constructor(
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
    private authenticationService: AuthenticationService,
    private usuarioServiceDB: UsuarioServiceDB,
    private globalErrorHandler: GlobalMessageHandler
  ) {
    this.userSubscription = this.user$.subscribe((usuario) => {
      this.usuario = usuario;
    });
    this.decodificaJWT();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async decodificaJWT() {
    if (this.accessTokenService.possuiToken() && this.usuario === null) {
      const token = this.accessTokenService.retornaToken();
      const { id } = jwtDecode(token) as { id: number };
      if (!this.usuario) {
        const usuario = await firstValueFrom(
          this.usuarioServiceDB.getUsuario(id)
        );
        this.userBehaviorSubject.next(usuario);
      }
    }
  }

  get usuario$() {
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

  async verifyAccess(
    path: NestedAccessKey<IUsuarioAcesso>[]
  ): Promise<boolean> {
    try {
      const usuario = this.userBehaviorSubject.getValue();

      if (!usuario) throw new Error('Usuário não encontrado.');

      if (!usuario.acesso) throw new Error('Usuário não possui acesso.');

      if (path.length === 0)
        throw new Error('Nenhum caminho de acesso informado.');

      const response = verifyUserAccess(path, usuario.acesso);

      if (!response) throw new Error('Usuário não possui acesso.');

      return response;
    } catch (error: any) {
      this.globalErrorHandler.handleError(error.message);
      return false;
    }
  }
}
