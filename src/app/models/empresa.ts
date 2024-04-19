import { IArquivo } from './arquivo';
import { IPessoa } from './pessoa';

export interface IEmpresa {
  id?: number;
  senha?: string;
  deletedAt?: Date;
  updatedAt?: Date;
  createdAt?: Date;
  id_pessoa?: number;
  pessoa?: IPessoa;
  token_tiny?: string;
  logoColor?: IArquivo;
  logoBlack?: IArquivo;
}
