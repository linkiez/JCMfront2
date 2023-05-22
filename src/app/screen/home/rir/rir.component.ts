import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Operador } from 'src/app/models/operador';
import { PedidoCompraItem } from 'src/app/models/pedido-compra';
import { Pessoa } from 'src/app/models/pessoa';
import { Produto } from 'src/app/models/produto';
import { Query } from 'src/app/models/query';
import { RIR } from 'src/app/models/rir';
import { OperadorService } from 'src/app/services/operador.service';
import { PedidoCompraService } from 'src/app/services/pedidocompra.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-rir',
  templateUrl: './rir.component.html',
  styleUrls: ['./rir.component.scss'],
})
export class RirComponent {
  rir: RIR = { cliente: false, recebido_data: new Date() };

  produtos: Produto[] = [];

  pessoas: Pessoa[] = [];

  operadores: Operador[] = [];

  pedidos_compra_item: PedidoCompraItem[] = [];

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private operadorService: OperadorService,
    private pedidoCompraService: PedidoCompraService
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

  update() {}

  create() {}

  createOrUpdate() {
    if (this.validacoes()) {
      if (this.rir.id) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  limpar() {
    this.rir = { cliente: false, recebido_data: new Date() };
  }

  searchPedidoCompraItem() {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: '',
      produto: this.rir.produto?.id,
      fornecedor: this.rir.pessoa?.fornecedor?.id,
      deleted: false,
    };

    this.pedidoCompraService.getPedidoCompraItem(query).subscribe({
      next: (consulta) =>
        (this.pedidos_compra_item = consulta.pedidosCompraItem),
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

  validacoes(): boolean {
    let valido = true;
    if (!this.rir.produto) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto não selecionado',
      });
      valido = false;
    }
    if (!this.rir.pessoa) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Pessoa não selecionada',
      });
      valido = false;
    }
    if (!this.rir.quantidade) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Quantidade não informada',
      });
      valido = false;
    }
    if (!this.rir.operador) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Operador não selecionado',
      });
      valido = false;
    }
    return valido;
  }
}
