import { IArquivo } from './arquivo';
import { IContato } from './contato';
import { IEmpresa } from './empresa';
import { IPessoa } from './pessoa';
import { IProduto } from './produto';
import { IVendaTiny } from './vendatiny';
import { IVendedor } from './vendedor';

export interface IOrcamento {
  id?: number;
  status?: string;
  contato?: IContato;
  id_contato?: number;
  pessoa?: IPessoa;
  id_pessoa?: number;
  vendedor?: IVendedor;
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
  orcamento_items: IOrcamentoItem[];
  files?: IArquivo[];
  empresa: IEmpresa;
  vendastinies?: IVendaTiny[];
}

export interface IOrcamentoItem {
  uuid?: string;
  id?: number;
  id_orcamento?: number;
  descricao?: string;
  produto?: IProduto;
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
  files?: IArquivo[];
  peso?: number;
  total?: number;
  total_peso?: number;
  total_hora?: number;
  custo?: number;
  orcamento?: IOrcamento;
}

export interface IOrcamentoItemXlSX {
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
