import { OrdemProducao } from './../models/ordem-producao';
import { Injectable } from '@angular/core';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

public orcamento: Query = {
  page: 0,
  pageCount: 25,
  searchValue: '',
  deleted: false,
};

public contatos: Query = {
  page: 0,
  pageCount: 25,
  searchValue: '',
  deleted: false,
};

public ordemProducao: Query = {
  page: 0,
  pageCount: 25,
  searchValue: '',
  deleted: false,
  status: '',
};

public pedidoCompra: Query = {
  page: 0,
  pageCount: 25,
  searchValue: '',
  deleted: false,
};

public pessoas: Query = {
  page: 0,
  pageCount: 10,
  searchValue: '',
  fornecedor: false,
  operador: false,
  vendedor: false,
  deleted: false,
};

public produtos: Query = {
  page: 0,
  pageCount: 25,
  searchValue: '',
  deleted: false,
};

constructor() { }

}