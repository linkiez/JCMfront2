import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Operador } from 'src/app/models/operador';
import { Pessoa } from 'src/app/models/pessoa';
import { Produto } from 'src/app/models/produto';
import { Query } from 'src/app/models/query';
import { RIR } from 'src/app/models/rir';
import { OperadorService } from 'src/app/services/operador.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-rir',
  templateUrl: './rir.component.html',
  styleUrls: ['./rir.component.scss'],
})
export class RirComponent {
  rir: RIR = {cliente: false};

  produtos: Produto[] = [];

  pessoas: Pessoa[] = [];

  operadores: Operador[] = [];

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private operadorService: OperadorService
  ) {}

  searchProduto(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.produtoService
      .getProdutos(query)
      // .pipe(
      //   distinctUntilChanged(), // recorda a ultima pesquisa
      //   debounceTime(1000) // espera um tempo antes de começar
      // )
      .subscribe({
        next: (consulta) => (this.produtos = consulta.produtos),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  searchPessoa(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
      fornecedor: !this.rir.cliente,
    };

    this.pessoaService
      .getPessoas(query)
      // .pipe(
      //   distinctUntilChanged(), // recorda a ultima pesquisa
      //   debounceTime(1000) // espera um tempo antes de começar
      // )
      .subscribe({
        next: (consulta) => (this.pessoas = consulta.pessoas),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  searchOperador(event: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.operadorService
      .getOperadores(query)
      // .pipe(
      //   distinctUntilChanged(), // recorda a ultima pesquisa
      //   debounceTime(1000) // espera um tempo antes de começar
      // )
      .subscribe({
        next: (consulta) => (this.operadores = consulta.operadores),
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }
}
