import { Arquivo } from "./arquivo";
import { Contato } from "./contato";
import { Fornecedor } from "./fornecedor";
import { Operador } from "./operador";
import { Usuario } from "./usuario";
import { Vendedor } from "./vendedor";

export interface Pessoa {
  id?: number;
  nome?: string;
  razao_social?: string;
  pessoa_juridica?: boolean;
  telefone?: number;
  email?: string;
  email_nfe?: string;
  endereco?: string;
  municipio?: string;
  uf?: string;
  cep?: number;
  ie_rg?: string;
  cnpj_cpf?: string;
  data_nasc?: Date;
  descricao?: Text;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  contatos?: Array<Contato>;
  files?: Array<Arquivo>;
  fornecedor?: Fornecedor
  operador?: Operador
  usuario?: Usuario
  vendedor?: Vendedor
}
