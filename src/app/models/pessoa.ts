import { IEmpresa } from './empresa';
import { IArquivo } from './arquivo';
import { IContato } from './contato';
import { IFornecedor } from './fornecedor';
import { IOperador } from './operador';
import { IUsuario } from './usuario';
import { IVendedor } from './vendedor';

export interface IPessoa {
  id?: number;
  nome?: string;
  razao_social?: string;
  pessoa_juridica?: boolean;
  telefone?: number;
  email?: string;
  email_nfe?: string;
  endereco?: string;
  numero?: number;
  complemento?: string;
  bairro?: string;
  municipio?: string;
  uf?: string;
  cep?: number;
  ie_rg?: string;
  cnpj_cpf?: string;
  data_nasc?: Date;
  descricao?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  contatos?: Array<IContato>;
  files?: Array<IArquivo>;
  fornecedor?: IFornecedor;
  operador?: IOperador;
  usuario?: IUsuario;
  vendedor?: IVendedor;
  empresa?: IEmpresa;
}
