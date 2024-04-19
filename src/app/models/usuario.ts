import { IPessoa } from './pessoa';

export interface IUsuario {
  id?: number;
  email?: string;
  senha?: string;
  confirmarSenha?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pessoa?: number;
  pessoa?: IPessoa;
  acesso?: any;
}
