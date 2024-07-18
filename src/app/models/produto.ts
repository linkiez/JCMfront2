import { IArquivo } from './arquivo';
import { IPedidoCompraItem } from './pedido-compra';

export interface IProduto {
  pedido_compra_items: IPedidoCompraItem[];
  id?: number;
  nome: string;
  categoria: string;
  espessura: number;
  peso: number;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
  files: IArquivo[];
  preco: number;
  id_tiny?: number;
}
