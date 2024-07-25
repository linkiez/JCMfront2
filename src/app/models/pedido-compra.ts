import { IArquivo } from './arquivo';
import { IFornecedor } from './fornecedor';
import { IProduto } from './produto';
import { IRIR } from './rir';

export interface IPedidoCompra {
  id?: number;
  pedido: string;
  data_emissao: Date;
  cond_pagamento: string;
  frete: number;
  transporte: string;
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  pedido_compra_items: IPedidoCompraItem[];
  id_fornecedor?: number;
  fornecedor: IFornecedor;
  files: IArquivo[];
  total: number;
  status: string;
  observacao: string;
}

export interface IPedidoCompraItem {
  precoComIpi: number;
  id?: number;
  dimensao: string;
  quantidade: number;
  peso: number;
  preco: number;
  ipi: number;
  total?: number;
  prazo: Date;
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  id_pedido?: number;
  id_produto?: number;
  produto: IProduto;
  peso_entregue: number;
  status: string;
  pedido_compra: IPedidoCompra;
  registro_inspecao_recebimentos: IRIR[];
}
