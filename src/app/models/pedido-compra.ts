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
  PedidoCompraItem?: Array<PedidoCompraItem>;
  id_fornecedor?: number;
  Fornecedor?: Fornecedor;
  total?: number;
}

export interface PedidoCompraItem {
  id?: number;
  dimensao?: string;
  quantidade?: number;
  peso?: number;
  preco?: number;
  ipi?: number;
  prazo?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pedido?: number;
  id_produto?: number;
  Produto?: Produto;
}
