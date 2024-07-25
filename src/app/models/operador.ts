import { IPessoa } from './pessoa';

export interface IOperador {
  id?: number;
  senha: string;
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  id_pessoa?: number;
  pessoa: IPessoa;
}
