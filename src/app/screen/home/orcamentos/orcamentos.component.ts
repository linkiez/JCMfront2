import { OrcamentoService } from './../../../services/orcamento.service';
import { PedidoCompraService } from './../../../services/pedidocompra.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { PedidoCompra } from 'src/app/models/pedido-compra';
import { Query } from 'src/app/models/query';
import { Paginator } from 'primeng/paginator';
import { Orcamento } from 'src/app/models/orcamento';


@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.css'],
  providers: [ConfirmationService],
})
export class OrcamentosComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: Paginator;

  orcamentos: Orcamento[] = []

  totalRecords: number = 0;

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    deleted: false,
  };

  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private orcamentoService: OrcamentoService) { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getOrcamentos();
  }

  getOrcamentos(pageChange?: boolean) {
    this.query.page = pageChange ? this.query.page : 0;

    this.orcamentoService.getOrcamentos(this.query)
      .pipe(
        debounceTime(1000), // espera um tempo antes de começar
        distinctUntilChanged() // recorda a ultima pesquisa
      )
      .subscribe({
        next: (consulta) => {
          this.orcamentos = consulta.orcamento;
          this.totalRecords = consulta.totalRecords;
          if (!pageChange) this.paginator.changePageToFirst(new Event(""));
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.message,
          });
        },
      });
  }

  new() {
    this.router.navigate(['/home/orcamentos/0']);
  }

  pageChange(event: any) {
    if (event) {
      this.query.page = event.page;
      this.query.pageCount = event.rows;
      this.getOrcamentos(true);
    }
  }

  clickDeleted(id: number) {
    if (!this.query.deleted) {
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
            console.log(error);
            this.messageService.clear;
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: error.message,
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
      this.query.searchValue?.length! > 2 ||
      this.query.searchValue?.length! === 0
    )
      this.getOrcamentos();
  }
}
