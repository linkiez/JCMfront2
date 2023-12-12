import { Arquivo } from "./arquivo";

export interface Produto {
  pedido_compra_items?: any;
  id?: number;
  nome?: string;
  categoria?: string;
  espessura?: number;
  peso?: number;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
  files?: Array<Arquivo>;
  preco?: number;
}
