import { IArquivo } from './arquivo';
import { IOperador } from './operador';
import { IOrcamento, IOrcamentoItem } from './orcamento';
import { IProduto } from './produto';
import { IRIR } from './rir';
import { IUsuario } from './usuario';
import { IVendedor } from './vendedor';

export interface IOrdemProducao {
  new?: IOrdemProducao;
  editable?: boolean;
  id?: number;
  data_prazo: Date;
  data_finalizacao: Date;
  data_entregue: Date;
  data_negociado: Date;
  dias_de_producao: number;
  venda: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  id_orcamento?: number;
  orcamento: IOrcamento;
  vendedor: IVendedor;
  id_vendedor?: number;
  ordem_producao_items: IOrdemProducaoItem[];
  ordem_producao_historicos: IOrdemProducaoHistorico[];
  newItem?: string;
  files: IArquivo[];
}

export interface IOrdemProducaoItem {
  id?: number;
  descricao: string;
  quantidade: number;
  observacao: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  id_produto?: number;
  produto: IProduto;
  id_rir?: number;
  files: IArquivo[];
  ordem_producao_item_processos: IOrdemProducaoItemProcesso[];
  registro_inspecao_recebimento: IRIR;
  id_orcamento_item?: number;
  orcamento_item: IOrcamentoItem;
  id_ordem_producao?: number;
  key?: string;
}

export interface IOrdemProducaoItemProcesso {
  id?: number;
  processo: string;
  inicio: Date;
  fabricado: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  id_operador?: number;
  operador: IOperador;
  id_ordem_producao_item?: number;
}

export interface IOrdemProducaoHistorico {
  id?: number;
  texto: string;
  id_usuario?: number;
  usuario: IUsuario;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  id_ordem_producao?: number;
}
