import { Arquivo } from './arquivo';
import { Contato } from './contato';
import { Empresa } from './empresa';
import { Pessoa } from './pessoa';
import { Produto } from './produto';
import { VendaTiny } from './vendatiny';
import { Vendedor } from './vendedor';

export interface Orcamento {
  id?: number;
  status?: string;
  contato?: Contato;
  id_contato?: number;
  pessoa?: Pessoa;
  id_pessoa?: number;
  vendedor?: Vendedor;
  id_vendedor?: number;
  prazo_emdias?: number;
  prazo_data?: string;
  aprovacao?: string;
  pc_cliente?: string;
  cond_pag?: string;
  frete?: number;
  embalagem?: string;
  transporte?: string;
  desconto?: number;
  imposto?: number;
  total?: number;
  observacao?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  orcamento_items: OrcamentoItem[];
  files?: Arquivo[];
  empresa: Empresa;
  vendastinies?: VendaTiny[];
}

export interface OrcamentoItem {
  uuid?: string;
  id?: number;
  id_orcamento?: number;
  descricao?: string;
  produto?: Produto;
  id_produto?: number;
  material_incluido?: boolean;
  processo?: string | string[];
  largura?: number;
  altura?: number;
  quantidade?: number;
  imposto?: number;
  preco_quilo?: number;
  tempo?: string;
  preco_hora?: number;
  total_manual?: number;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  files?: File[];
  peso?: number;
  total?: number;
  total_peso?: number;
  total_hora?: number;
  custo?: number;
  orcamento?: Orcamento;
}

export interface OrcamentoItemXlSX {
  item: number;
  descricao: string;
  produto: string;
  material_incluido: string | boolean;
  processo: string;
  largura: number;
  altura: number;
  quantidade: number;
  imposto: number;
  preco_quilo: number;
  tempo: string;
  preco_hora: number;
  total_manual: number;
}
