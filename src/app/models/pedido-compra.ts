import { IArquivo } from './arquivo';
import { IFornecedor } from './fornecedor';
import { IProduto } from './produto';

export interface IPedidoCompra {
  id?: number;
  pedido?: string;
  data_emissao?: Date;
  cond_pagamento?: string;
  frete?: number;
  transporte?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  pedido_compra_items: Array<IPedidoCompraItem>;
  id_fornecedor?: number;
  fornecedor?: IFornecedor;
  files?: Array<IArquivo>;
  total?: number;
  status?: string;
  observacao?: string;
}

export interface IPedidoCompraItem {
  id?: number;
  dimensao?: string;
  quantidade?: number;
  peso?: number;
  preco?: number;
  ipi?: number;
  total?: number;
  prazo?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pedido?: number;
  id_produto?: number;
  produto?: IProduto;
  peso_entregue: number;
  status: string;
  pedido_compra?: IPedidoCompra;
}
