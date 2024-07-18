import { IPessoa } from './pessoa';

export interface IVendedor {
  id?: number;
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  id_pessoa?: number;
  pessoa: IPessoa;
}
