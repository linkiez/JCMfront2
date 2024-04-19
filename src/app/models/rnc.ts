import { IOrdemProducaoItem } from './ordem-producao';
import { IProduto } from './produto';
import { IUsuario } from './usuario';

export interface IRNC {
  id?: number;
  status?: string;
  classificacao?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  data_fechamento?: Date;
  descricao?: string;
  causa?: string;
  acao_disposicao?:
    | 'Refugar'
    | 'Retrabalhar'
    | 'Reclassificar'
    | 'Aprovação Condicional'
    | 'Outros'
    | null;
  acao_contencao?: string;
  acao_corretiva?: string;
  acao_preventiva?: string;
  responsavel_analise?: IUsuario;
  responsavel_analise_id?: number;
  reclamacao_cliente?: boolean;
  rnc_items?: IRNCItem[];
  eficacia?: 'Sim' | 'Não' | null;
  eficacia_motivo?: string;
  eficacia_descricao?: string;
  eficacia_observacao?: string;
  risco?: string;
  custo: number;
}

export interface IRNCItem {
  id?: number;
  id_rnc?: number;
  id_produto: number;
  produto: IProduto;
  quantidade: number;
  largura: number;
  altura?: number;
  id_ordem_producao_item: number;
  ordem_producao_item: IOrdemProducaoItem;
  observacao?: string;
}
