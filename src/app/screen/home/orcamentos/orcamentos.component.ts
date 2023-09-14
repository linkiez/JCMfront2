import { VendedorService } from './../../../services/vendedor.service';
import { QueryService } from './../../../services/query.service';
import { OrcamentoService } from './../../../services/orcamento.service';
import { PedidoCompraService } from './../../../services/pedidocompra.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { PedidoCompra } from 'src/app/models/pedido-compra';
import { Query } from 'src/app/models/query';
import { Paginator } from 'primeng/paginator';
import { Orcamento } from 'src/app/models/orcamento';
import { Vendedor } from 'src/app/models/vendedor';

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.css'],
  providers: [ConfirmationService],
})
export class OrcamentosComponent implements OnInit, OnDestroy, AfterViewInit  {
  @ViewChild('paginator') paginator!: Paginator;

  orcamentos: Orcamento[] = [];

  totalRecords: number = 0;

  first = 0;

  vendedores: Vendedor[] = [];

  toogleFiltros: boolean = false;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private orcamentoService: OrcamentoService,
    public queryService: QueryService,
    private vendedorService: VendedorService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.getOrcamentos(true);
    this.first = this.queryService.orcamento.page * this.queryService.orcamento.pageCount;
    this.searchVendedor("");
  }

  ngAfterViewInit() {
  }

  getOrcamentos(pageChange?: boolean) {
    this.queryService.orcamento.page = pageChange
      ? this.queryService.orcamento.page
      : 0;

    this.orcamentoService
      .getOrcamentos(this.queryService.orcamento)
      .pipe(
        // debounceTime(1000), // espera um tempo antes de começar
        distinctUntilChanged() // recorda a ultima pesquisa
      )
      .subscribe({
        next: (consulta) => {
          this.orcamentos = consulta.orcamento;
          this.totalRecords = consulta.totalRecords;
          if (!pageChange) this.paginator.changePageToFirst(new Event(''));
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar os orçamentos - '+error.error,
          });
        },
      });
  }

  new() {
    this.router.navigate(['/home/orcamentos/0']);
  }

  pageChange(event: any) {
    if (event) {
      this.queryService.orcamento.page = event.page;
      this.queryService.orcamento.pageCount = event.rows;
      this.getOrcamentos(true);
    }
  }

  clickDeleted(id: number) {
    if (!this.queryService.orcamento.deleted) {
      this.router.navigate([`home/orcamentos/${id}`]);
    } else {
      this.confirm(id);
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja restaurar esse orçamento?',
      accept: () => {
        this.orcamentoService.restoreOrcamento(id).subscribe({
          error: (error: any) => {
            console.error(error);
            this.messageService.clear;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao restaurar o orçamento - '+error.error,
            });
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'O orçamento foi restaurado.',
            });
            this.getOrcamentos();
          },
        });
      },
    });
  }

  search() {
    if (
      this.queryService.orcamento.searchValue?.length! > 2 ||
      this.queryService.orcamento.searchValue?.length! === 0
    )
      this.getOrcamentos();
  }

  searchVendedor(searchTerm: any) {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: searchTerm.query,
      deleted: false,
    };

    this.vendedorService
      .getVendedores(query)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (consulta) => (this.vendedores = consulta.vendedores),
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar os vendedores - '+error.error,
          });
        },
      });
  }
}
