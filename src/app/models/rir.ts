import { IArquivo } from './arquivo';
import { IOperador } from './operador';
import { IOrdemProducaoItem } from './ordem-producao';
import { IPedidoCompraItem } from './pedido-compra';
import { IPessoa } from './pessoa';
import { IProduto } from './produto';

export interface IRIR {
  id?: number;
  descricao?: string;
  produto?: IProduto;
  quantidade?: number;
  nfe?: string;
  nfe_data?: Date;
  cliente?: boolean;
  pessoa?: IPessoa;
  recebido_data?: Date;
  operador?: IOperador;
  conferido?: boolean;
  observacoes?: string;
  files?: IArquivo[];
  pedido_compra_item?: IPedidoCompraItem;
  ordem_producao_item?: IOrdemProducaoItem;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}
