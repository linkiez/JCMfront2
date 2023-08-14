import { Pessoa } from "./pessoa";
import { Vendedor } from "./vendedor";

export interface Query {
  page: number;
  pageCount: number;
  searchValue: string;
  fornecedor?: boolean | number;
  operador?: boolean;
  vendedor?: boolean | Vendedor;
  id_vendedor?: number;
  deleted?: boolean;
  status?: string;
  produto?: number;
  data_prazo?: Date;
  ano?: number;
}
