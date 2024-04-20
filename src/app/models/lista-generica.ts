import { ExtendedTemplateDiagnosticName } from '@angular/compiler-cli/src/ngtsc/diagnostics';
import e from 'express';

export interface IListaGenerica {
  id?: number;
  nome?: string;
  lista_generica_items: Array<IListaGenericaItem>;
  deletedAt?: Date;
  updateAt?: Date;
  createAt?: Date;
}

export interface IListaGenericaItem {
  id?: number;
  valor?: string;
  valor2?: string;

  deletedAt?: Date;
  updateAt?: Date;
  createAt?: Date;
  id_lista?: number;
}

export interface IPrinterSettings {
  id?: number;
  id_lista?: number;
  valor: string;
  valor2: {
        width: number;
        height: number;
        margin: { left: number; right: number; top: number; bottom: number };
      };
  deletedAt?: Date;
  updateAt?: Date;
  createAt?: Date;
}
