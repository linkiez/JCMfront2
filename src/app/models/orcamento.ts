import { Arquivo } from "./arquivo";
import { Contato } from "./contato";
import { Pessoa } from "./pessoa";
import { Produto } from "./produto";
import { Vendedor } from "./vendedor";

export interface Orcamento {
  id?: number;
  status?: string;
  contato?: Contato;
  id_contato?: number;
  pessoa?: Pessoa;
  id_pessoa?: Vendedor;
  id_vendedor?: number;
  prazo_emdias?: number;
  prazo_data?: string;
  aprovacao?: string;
  pc_cliente?: string;
  cond_pag?: string;
  frete?: number;
  transporte?: string;
  desconto?: number;
  imposto?: number;
  total?: number;
  observacao?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  orcamento_item?: OrcamentoItem[]
  files?: Arquivo[];

}

export interface OrcamentoItem{
  id?: number;
  id_orcamento?: number;
  descricao?: string;
  produto?: Produto;
  id_produto?: number;
  material_incluido?: boolean;
  processo?: string;
  largura?: number;
  altura?: number;
  quantidade?: number;
  preco_quilo?: number;
  tempo?: string;
  preco_hora?: number;
  total_manual?: number;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  files?: File[];
}
