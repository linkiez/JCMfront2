import { IPessoa } from './pessoa';
import { IVendedor } from './vendedor';

export interface IQuery {
  page: number;
  pageCount: number;
  searchValue: string;
  fornecedor?: boolean | number;
  operador?: boolean;
  vendedor?: boolean | IVendedor;
  id_vendedor?: number;
  deleted?: boolean;
  status?: string;
  produto?: number;
  data_prazo?: Date;
  ano?: number;
  pessoa_id?: number;
}
