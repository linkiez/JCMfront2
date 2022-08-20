import { Pessoa } from "./pessoa";

export interface Vendedor {
  id?: number;
  senha?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pessoa?: number;
  pessoa?: Pessoa;
}
