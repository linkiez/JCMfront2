import { IEmpresa } from './empresa';
import { IArquivo } from './arquivo';
import { IContato } from './contato';
import { IFornecedor } from './fornecedor';
import { IOperador } from './operador';
import { IUsuario } from './usuario';
import { IVendedor } from './vendedor';

export interface IPessoa {
  id?: number;
  nome: string;
  razao_social: string;
  pessoa_juridica: boolean;
  telefone: string;
  email: string;
  email_nfe: string;
  endereco: string;
  numero: number;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  ie_rg: string;
  cnpj_cpf: string;
  data_nasc: Date;
  descricao: string;
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  contatos: IContato[];
  files: IArquivo[];
  fornecedor: IFornecedor;
  operador: IOperador;
  usuario: IUsuario;
  vendedor: IVendedor;
  empresa: IEmpresa;
}
