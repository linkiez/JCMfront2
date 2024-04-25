import { IPessoa } from './pessoa';

export interface IVendedor {
  id?: number;
  senha?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pessoa?: number;
  pessoa?: IPessoa;
}
