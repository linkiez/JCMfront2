import { Vendedor } from "./vendedor";

export interface Query {
  page: number;
  pageCount: number;
  searchValue: string;
  fornecedor?: boolean | number;
  operador?: boolean;
  vendedor?: boolean | Vendedor;
  deleted: boolean;
  status?: string;
  produto?: number;
}
