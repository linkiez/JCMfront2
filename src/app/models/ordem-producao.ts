import { Arquivo } from "./arquivo";
import { Empresa } from "./empresa";
import { Operador } from "./operador";
import { Orcamento } from "./orcamento";
import { Produto } from "./produto";
import { RIR } from "./rir";
import { Usuario } from "./usuario";
import { Vendedor } from "./vendedor";

export interface OrdemProducao {
  new?: OrdemProducao;
  editable?: boolean;
  id?: number;
  data_prazo?: Date;
  data_finalizacao?: Date;
  data_entregue?: Date;
  data_negociado?: Date;
  dias_de_producao?: number;
  venda?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  id_orcamento?: number;
  orcamento?: Orcamento;
  id_empresa?: number;
  empresa?: Empresa;
  vendedor?: Vendedor;
  ordem_producao_items?: OrdemProducaoItem[];
  ordem_producao_historicos?: OrdemProducaoHistorico[];
  newItem?: string;
}

export interface OrdemProducaoItem {
  id?: number;
  descricao?: string;
  quantidade?: number;
  observacao?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  id_produto: number;
  produto?: Produto;
  id_rir?: number;
  files?: Arquivo[];
  ordem_producao_item_processos?: OrdemProducaoItemProcesso[];
  registro_inspecao_recebimento?: RIR;
  id_ordem_producao?: number;
}

export interface OrdemProducaoItemProcesso {
  id?: number;
  processo?: string;
  inicio?: Date;
  fabricado?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  id_operador?: number;
  operador?: Operador
}

export interface OrdemProducaoHistorico{
  id?: number;
  texto?: string;
  id_usuario?: number;
  usuario?: Usuario
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
