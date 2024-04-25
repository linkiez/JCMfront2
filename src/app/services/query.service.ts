import { Injectable } from '@angular/core';
import { IQuery } from '../models/query';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  public orcamento: IQuery = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
    vendedor: undefined,
  };

  public contatos: IQuery = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
  };

  public ordemProducao: IQuery = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
    status: '',
    vendedor: undefined,
    id_vendedor: undefined,
    data_prazo: undefined,
  };

  public pedidoCompra: IQuery = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
  };

  public pessoas: IQuery = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    fornecedor: false,
    operador: false,
    vendedor: false,
    deleted: false,
  };

  public produtos: IQuery = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
  };

  public rir: IQuery = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
  };

  public iqf: { fornecedor: number | undefined; ano: number } = {
    fornecedor: undefined,
    ano: new Date().getFullYear(),
  };

  public rncs: IQuery = {
    page: 0,
    pageCount: 25,
    searchValue: '',
    deleted: false,
  };

  constructor() {}
}
