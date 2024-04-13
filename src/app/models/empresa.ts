import { Arquivo } from "./arquivo";
import { Pessoa } from "./pessoa";

export interface Empresa {
  id?: number;
  senha?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pessoa?: number;
  pessoa?: Pessoa;
  token_tiny?: string;
  logoColor?: Arquivo;
  logoBlack?: Arquivo;
}
