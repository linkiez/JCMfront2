export interface Query {
  page: number;
  pageCount: number;
  searchValue: string;
  fornecedor?: boolean | number;
  operador?: boolean;
  vendedor?: boolean;
  deleted: boolean;
  status?: string;
  produto?: number;
}
