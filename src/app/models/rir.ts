import { IArquivo } from './arquivo';
import { IOperador } from './operador';
import { IOrdemProducaoItem } from './ordem-producao';
import { IPedidoCompraItem } from './pedido-compra';
import { IPessoa } from './pessoa';
import { IProduto } from './produto';

export interface IRIR {
  id?: number;
  descricao: string;
  produto: IProduto;
  id_produto?: number;
  quantidade: number;
  nfe: string;
  nfe_data: Date;
  cliente: boolean;
  pessoa: IPessoa;
  id_pessoa?: number;
  recebido_data: Date;
  operador: IOperador;
  id_operador?: number;
  conferido: boolean;
  observacoes: string;
  files: IArquivo[];
  pedido_compra_item: IPedidoCompraItem;
  id_pedido_compra_item?: number;
  ordem_producao_item: IOrdemProducaoItem;
  id_ordem_producao_item?: number;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date;
}
