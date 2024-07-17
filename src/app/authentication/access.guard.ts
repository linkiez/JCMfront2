import { MessageService } from 'primeng/api';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UsuarioService } from './usuario.service';
import { inject } from '@angular/core';
import { IUsuarioAcesso } from '../models/usuario';

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
    const messageService = inject(MessageService);
    const usuario = usuarioService.userBehaviorSubject.getValue();

    if (!usuario) {

      messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Usuário vazio.',
      })
      return false;
    }
    const response = verifyUserAccess(path, usuario.acesso);
    if (!response) {
      messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Acesso não autorizado.',
      });
    }

    return response;
  };
}

function verifyUserAccess(path: string[], acesso: IUsuarioAcesso | NestedAccess): boolean {
  // if (path.length === 0 || !acesso || typeof acesso !== 'object' || !(path[0] in acesso)) {
  //   return false;
  // }
  const currentAccess = acesso as { [key: string]: NestedAccess };
  const currentAccessValue = currentAccess[path[0]];

  if (typeof currentAccessValue === 'boolean') {
    return currentAccessValue;
  }

  return verifyUserAccess(
    path.slice(1),
    currentAccessValue
  );
}

