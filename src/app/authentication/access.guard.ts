import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UsuarioService } from './usuario.service';
import { inject } from '@angular/core';
import { IUsuarioAcesso } from '../models/usuario';
import { GlobalErrorHandler } from '../services/global-error-handler.service';


export type NestedAccess = boolean | { [key: string]: NestedAccess };
export type NestedAccessKey<T> = {
  [K in keyof T & (string | number | boolean)]:
    T[K] extends object
      ? `${K}` | `${NestedAccessKey<T[K]>}`
      : `${K}`
}[keyof T & (string | number | boolean)];


export function AccessGuard(path: NestedAccessKey<IUsuarioAcesso>[]): CanActivateFn | CanMatchFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const usuarioService = inject(UsuarioService);
    const globalErrorHandler = inject(GlobalErrorHandler);

    const usuario = usuarioService.userBehaviorSubject.getValue();

    if (!usuario) globalErrorHandler.handleError('Usuário não encontrado.');

    const response = verifyUserAccess(path, usuario.acesso);
    if (!response) globalErrorHandler.handleError('Usuário não possui acesso.');

    return response;
  };
}

function verifyUserAccess(path: string[], acesso: IUsuarioAcesso | NestedAccess): boolean {
  const currentAccess = acesso as { [key: string]: NestedAccess };
  const currentAccessValue = currentAccess[path[0]];

  if (path.length === 0 || !currentAccess || !(path[0] in currentAccess)) {
    return false;
  }


  if (typeof currentAccessValue === 'boolean') {
    return currentAccessValue;
  }

  return verifyUserAccess(
    path.slice(1),
    currentAccessValue
  );
}

