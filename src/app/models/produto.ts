import { IArquivo } from './arquivo';

export interface IProduto {
  pedido_compra_items?: any;
  id?: number;
  nome?: string;
  categoria?: string;
  espessura?: number;
  peso?: number;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
  files?: Array<IArquivo>;
  preco?: number;
}
