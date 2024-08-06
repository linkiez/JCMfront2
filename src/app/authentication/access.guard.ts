import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UsuarioService } from './usuario.service';
import { inject } from '@angular/core';
import { IUsuarioAcesso } from '../models/usuario';
import { GlobalMessageHandler } from '../services/global-error-handler.service';

export type NestedAccess = boolean | { [key: string]: NestedAccess };
export type NestedAccessKey<T> = {
  [K in keyof T & (string | number | boolean)]: T[K] extends object
    ? `${K}` | `${NestedAccessKey<T[K]>}`
    : `${K}`;
}[keyof T & (string | number | boolean)];

export function AccessGuard(
  path: NestedAccessKey<IUsuarioAcesso>[]
): CanActivateFn | CanMatchFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
    const usuarioService = inject(UsuarioService);
    const globalErrorHandler = inject(GlobalMessageHandler);

    try {
      await usuarioService.decodificaJWT();

      const usuario = usuarioService.userBehaviorSubject.getValue();

      if (!usuario) throw new Error('Usuário não encontrado.');

      if (!usuario.acesso) throw new Error('Usuário não possui acesso.');

      if (path.length === 0)
        throw new Error('Nenhum caminho de acesso informado.');

      const response = verifyUserAccess(path, usuario.acesso);
      if (!response) throw new Error('Usuário não possui acesso.');

      return response;
    } catch (error: any) {
      globalErrorHandler.handleError(error.message);
      return false;
    }
  };
}

export function verifyUserAccess(
  path: string[],
  acesso: IUsuarioAcesso | NestedAccess
): boolean {
  const currentAccess = acesso as { [key: string]: NestedAccess };
  const currentAccessValue = currentAccess[path[0]];

  if (path.length === 0 || !currentAccess || !(path[0] in currentAccess)) {
    return false;
  }

  if (typeof currentAccessValue === 'boolean') {
    return currentAccessValue;
  }

  return verifyUserAccess(path.slice(1), currentAccessValue);
}
