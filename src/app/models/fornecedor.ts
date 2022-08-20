import { Pessoa } from "./pessoa";

export interface Fornecedor {
  id?: number;
  data_aprov?: Date;
  data_venc?: Date;
  observacao?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pessoa?: number;
  pessoa?: Pessoa;
}
