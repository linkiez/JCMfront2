import { Pessoa } from "./pessoa";

export interface Usuario {
  id?: number;
  email?: string;
  senha?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pessoa?: number;
  pessoa?: Pessoa;
  acesso?: any
}
