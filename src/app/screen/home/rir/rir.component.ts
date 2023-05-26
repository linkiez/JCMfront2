import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { RIRService } from 'src/app/services/rir.service';

@Component({
  selector: 'app-rir',
  templateUrl: './rir.component.html',
  styleUrls: ['./rir.component.scss'],
})
export class RirComponent implements OnInit {
  rir: RIR = { cliente: false, recebido_data: new Date() };

  produtos: Produto[] = [];

  pessoas: Pessoa[] = [];

  operadores: Operador[] = [];

  pedidos_compra_item: PedidoCompraItem[] = [];

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    deleted: false,
  };

  totalRecords: number = 0;

  rirs: RIR[] = [];

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private operadorService: OperadorService,
    private pedidoCompraService: PedidoCompraService,
    private RIRService: RIRService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getRIRs();
  }

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

  update() {
    this.RIRService.updateRIR(this.rir).subscribe({
      next: (rir) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'RIR atualizado',
        });
        this.rir = rir;
        console.log(rir);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message,
        });
      },
      complete: () => this.getRIRs(),
    });
  }

  create() {
    this.RIRService.addRIR(this.rir).subscribe({
      next: (rir) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'RIR adicionado',
        });
        this.rir = rir;
        console.log(rir);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.message,
        });
      },
      complete: () => this.getRIRs(),
    });
  }

  createOrUpdate() {
    console.log(this.rir)
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

  searchRIRs() {

  }

  pageChange(event: any) {
    this.query.page = event.page;
    this.query.pageCount = event.rows;
    this.getRIRs(true);
  }

  getRIRs(pageChange?: boolean) {
    this.query.page = pageChange ? this.query.page : 0;

    this.RIRService.getRIRs(this.query).subscribe({
      next: (consulta) => {
        console.log(consulta);
        this.rirs = consulta.rirs;
        this.rirs = this.rirs.map((rir) => {
          if (rir.recebido_data !== undefined) {
            rir.recebido_data = new Date(rir.recebido_data);
          }
          if (rir.nfe_data !== undefined) {
            rir.nfe_data = new Date(rir.nfe_data);
          }
          return rir;
        });
        this.totalRecords = consulta.totalRecords;
      },
      error: (error) => {
        console.log(error, this.query);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar rirs',
        });
      },
    });

  }

  log(item: any) {
    console.log(item);
  }
}