import { IOrdemProducaoItem } from './../../../models/ordem-producao';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IOperador } from 'src/app/models/operador';
import { IPedidoCompraItem } from 'src/app/models/pedido-compra';
import { IPessoa } from 'src/app/models/pessoa';
import { IProduto } from 'src/app/models/produto';
import { IQuery } from 'src/app/models/query';
import { IRIR } from 'src/app/models/rir';
import { OperadorService } from 'src/app/services/operador.service';
import { PedidoCompraService } from 'src/app/services/pedidocompra.service';
import { PessoaService } from 'src/app/services/pessoa.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { QueryService } from 'src/app/services/query.service';
import { RIRService } from 'src/app/services/rir.service';
import { consoleLogDev } from 'src/app/utils/consoleLogDev';

@Component({
  selector: 'app-rir',
  templateUrl: './rir.component.html',
  styleUrls: ['./rir.component.css'],
})
export class RirComponent implements OnInit {
  rir: IRIR = {
    cliente: false, recebido_data: new Date(),
    descricao: '',
    produto: undefined,
    quantidade: 0,
    nfe: '',
    nfe_data: undefined,
    pessoa: undefined,
    operador: undefined,
    conferido: false,
    observacoes: '',
    files: [],
    pedido_compra_item: undefined,
    ordem_producao_item: undefined,
    updatedAt: undefined,
    createdAt: undefined,
    deletedAt: undefined
  };

  produtos: IProduto[] = [];

  pessoas: IPessoa[] = [];

  operadores: IOperador[] = [];

  pedidos_compra_item: IPedidoCompraItem[] = [];

  dialogVisible = false;

  totalRecords: number = 0;

  rirs: IRIR[] = [];

  constructor(
    private produtoService: ProdutoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private operadorService: OperadorService,
    private pedidoCompraService: PedidoCompraService,
    private RIRService: RIRService,
    public queryService: QueryService
  ) {}
  ngOnInit(): void {
    this.getRIRs();
  }

  searchProduto(event: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.produtoService
      .getProdutos(query)
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe({
        next: consulta => this.produtos = consulta.produtos,
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos - ' + error.error.message,
          });
        },
      });
  }

  searchPessoa(event: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
      fornecedor: !this.rir.cliente,
    };

    this.pessoaService
      .getPessoas(query)
      .pipe(
        distinctUntilChanged(), // recorda a ultima pesquisa
        debounceTime(500) // espera um tempo antes de começar
      )
      .subscribe({
        next: (consulta) => (this.pessoas = consulta.pessoas),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar pessoas - ' + error.error.message,
          });
        },
      });
  }

  searchOperador(event: any) {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: event.query,
      deleted: false,
    };

    this.operadorService
      .getOperadores(query)
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe({
        next: (consulta) => (this.operadores = consulta.operadores),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar operadores - ' + error.error.message,
          });
        },
      });
  }

  update() {
    this.RIRService.updateRIR(this.rir).subscribe({
      next: (rir: IRIR) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'RIR atualizado',
        });
        this.rir = rir;
        this.rir.recebido_data = new Date(rir.recebido_data!);
        this.rir.nfe_data = new Date(rir.nfe_data!);
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar rir. - ' + error.error.message,
        });
      },
      complete: () => this.getRIRs(true),
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
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao adicionar rir. - ' + error.error.message,
        });
      },
      complete: () => this.getRIRs(true),
    });
  }

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
    this.rir = {
      cliente: false, recebido_data: new Date(),
      descricao: '',
      produto: undefined,
      quantidade: 0,
      nfe: '',
      nfe_data: undefined,
      pessoa: undefined,
      operador: undefined,
      conferido: false,
      observacoes: '',
      files: [],
      pedido_compra_item: undefined,
      ordem_producao_item: undefined,
      updatedAt: undefined,
      createdAt: undefined,
      deletedAt: undefined
    };;
  }

  searchPedidoCompraItem() {
    const query: IQuery = {
      page: 0,
      pageCount: 10,
      searchValue: '',
      produto: this.rir.produto?.id,
      fornecedor: this.rir.pessoa?.fornecedor?.id,
      deleted: false,
    };

    this.pedidoCompraService
      .getPedidoCompraItem(query)
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe({
        next: (consulta) =>
          (this.pedidos_compra_item = consulta.pedidosCompraItem),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar pedidos de compra - ' + error.error.message,
          });
        },
      });
  }

  validacoes(): boolean {
    let valido = true;
    if (!this.rir.produto?.nome) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto não selecionado',
      });
      valido = false;
    }
    if (!this.rir.pessoa?.nome) {
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
    if (!this.rir.operador?.pessoa?.nome) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Operador não selecionado',
      });
      valido = false;
    }
    return valido;
  }

  pageChange(event: any) {
    this.queryService.rir.page = event.page;
    this.queryService.rir.pageCount = event.rows;
    this.getRIRs(true);
  }

  getRIRs(pageChange?: boolean) {
    this.queryService.rir.page = pageChange ? this.queryService.rir.page : 0;

    this.RIRService.getRIRs(this.queryService.rir).subscribe({
      next: (consulta) => {

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
        consoleLogDev(consulta);
      },
      error: (error) => {
        console.error(error, this.queryService.rir);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar rirs - ' + error.error.message,
        });
      },
    });
  }

  log(item: any) {
    console.log(item);
  }

  onChangeQuantidade(event: any) {
    this.rir.quantidade = Number(event.replace(/[^\d]/g, '')) / 100;
  }

  setOfOrdemProducaoItem(op_items: IOrdemProducaoItem[]) {
    const setOPs = new Set();
    for (const op_item of op_items) {
      if (op_item.id_ordem_producao) setOPs.add(op_item.id_ordem_producao);
    }
    return setOPs;
  }

  delete(rir: IRIR) {
    this.RIRService.deleteRIR(rir).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'RIR apagado',
        });
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao apagar rir. - ' + error.error.message,
        });
      },
      complete: () => this.getRIRs(true),
    });
  }

  optionLabel(event: IPedidoCompraItem) {
    const label = `${event.pedido_compra?.pedido} - ${event.dimensao} - ${Math.round(event.peso!).toFixed(0)}Kg`;
    return `${label}`;
  }
}
