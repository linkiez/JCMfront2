import { Fornecedor } from "./fornecedor";
import { Produto } from "./produto";

export interface PedidoCompra {
  id?: number;
  pedido?: string;
  data_emissao?: Date;
  cond_pagamento?: string;
  frete?: number;
  transporte?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  pedido_compra_items: Array<PedidoCompraItem>;
  id_fornecedor?: number;
  fornecedor?: Fornecedor;
  total?: number;
  status?: string;
}

export interface PedidoCompraItem {
  id?: number;
  dimensao?: string;
  quantidade?: number;
  peso?: number;
  preco?: number;
  ipi?: number;
  total?: number
  prazo?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pedido?: number;
  id_produto?: number;
  produto?: Produto;
}
