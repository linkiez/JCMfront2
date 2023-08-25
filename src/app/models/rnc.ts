import { OrdemProducaoItem } from "./ordem-producao";
import { Produto } from "./produto";
import { Usuario } from "./usuario";

export interface RNC {
  id?: number;
  status?: string;
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
  acao_corretiva?: string;
  acao_preventiva?: string;
  acao_imediata?: string;
  responsavel_analise?: Usuario;
  responsavel_analise_id?: number;
  reclamacao_cliente?: boolean;
  rnc_item?: RNCItem[];
}

export interface RNCItem {
  id?: number;
  id_rnc?: number;
  id_produto: number;
  produto: Produto;
  quantidade: number;
  largura: number;
  altura?: number;
  id_ordem_producao_item: number;
  ordem_producao_item: OrdemProducaoItem;
  observacao?: string;
}
