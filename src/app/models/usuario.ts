import { IPessoa } from './pessoa';

export interface IUsuario {
  id?: number;
  email: string;
  senha: string;
  confirmarSenha: string;
  deletedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  id_pessoa?: number;
  pessoa: IPessoa;
  acesso: IUsuarioAcesso;
}

export interface IUsuarioAcesso {
  admin: boolean;
  contato: {
    findAll: boolean;
    findAllDeleted: boolean;
    findAllContatoPessoa: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  file: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    destroy: boolean;
    restore: boolean;
  };
  fornecedor: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  listaGenerica: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  operador: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  orcamento: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  ordemProducao: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  pedidoCompra: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  pessoa: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    findByName: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  produto: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    findByName: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  rir: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  usuario: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  vendedor: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  empresa: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
  rnc: {
    findAll: boolean;
    findAllDeleted: boolean;
    findOne: boolean;
    create: boolean;
    update: boolean;
    destroy: boolean;
    restore: boolean;
  };
}
