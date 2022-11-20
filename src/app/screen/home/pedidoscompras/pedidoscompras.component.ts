import { PedidoCompraService } from './../../../services/pedidocompra.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { PedidoCompra } from 'src/app/models/pedido-compra';
import { Query } from 'src/app/models/query';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-pedidoscompras',
  templateUrl: './pedidoscompras.component.html',
  styleUrls: ['./pedidoscompras.component.scss'],
  providers: [ConfirmationService],
})
export class PedidosComprasComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: Paginator;

  pedidosCompra: Array<PedidoCompra> = [];

  totalRecords: number = 0;

  query: Query = {
    page: 0,
    pageCount: 10,
    searchValue: '',
    deleted: false,
  };

  private subscription: Subscription = new Subscription();

  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private pedidoCompraService: PedidoCompraService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getPedidosCompra();
  }

  getPedidosCompra(pageChange?: boolean) {
    this.query.page = pageChange ? this.query.page : 0;

    this.subscription = this.pedidoCompraService
      .getPedidoCompras(this.query)
      .pipe(
        debounceTime(1000), // espera um tempo antes de começar
        distinctUntilChanged() // recorda a ultima pesquisa
      )
      .subscribe({
        next: (consulta) => {
          this.pedidosCompra = consulta.pedidosCompra;
          this.totalRecords = consulta.totalRecords;
          if (!pageChange) this.paginator.changePageToFirst(new Event(""));
        },
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

  new() {
    this.router.navigate(['/home/pedidoscompras/0']);
  }

  pageChange(event: any) {
    if (event) {
      this.query.page = event.page;
      this.query.pageCount = event.rows;
      this.getPedidosCompra(true);
    }
  }

  clickDeleted(id: number) {
    if (!this.query.deleted) {
      this.router.navigate([`home/pedidoscompras/${id}`]);
    } else {
      this.confirm(id);
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja restaurar esse produto?',
      accept: () => {
        this.pedidoCompraService.restorePedidoCompra(id).subscribe({
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
              detail: 'O pedido de compra foi restaurado.',
            });
            this.getPedidosCompra();
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
      this.getPedidosCompra();
  }
}
