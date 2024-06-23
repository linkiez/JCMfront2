import { QueryService } from 'src/app/services/query.service';
import { PedidoCompraService } from './../../../services/pedidocompra.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { IPedidoCompra } from 'src/app/models/pedido-compra';
import { IQuery } from 'src/app/models/query';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-pedidoscompras',
  templateUrl: './pedidoscompras.component.html',
  styleUrls: ['./pedidoscompras.component.css'],
  providers: [ConfirmationService],
})
export class PedidosComprasComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: Paginator;

  pedidosCompra: Array<IPedidoCompra> = [];

  totalRecords: number = 0;

  first = 0;

  private subscription: Subscription = new Subscription();

  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private pedidoCompraService: PedidoCompraService,
    public queryService: QueryService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getPedidosCompra(true);
    this.first =
      this.queryService.pedidoCompra.page *
      this.queryService.pedidoCompra.pageCount;
  }

  getPedidosCompra(pageChange?: boolean) {
    this.queryService.pedidoCompra.page = pageChange
      ? this.queryService.pedidoCompra.page
      : 0;

    this.subscription = this.pedidoCompraService
      .getPedidoCompras(this.queryService.pedidoCompra)
      .subscribe({
        next: (consulta) => {
          this.pedidosCompra = consulta.pedidosCompra;
          this.totalRecords = consulta.totalRecords;
          if (!pageChange) this.paginator.changePageToFirst(new Event(''));
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar os pedidos de compra. - ' + error.error.message,
          });
        },
      });
  }

  new() {
    this.router.navigate(['/home/pedidoscompras/0']);
  }

  pageChange(event: any) {
    if (event) {
      this.queryService.pedidoCompra.page = event.page;
      this.queryService.pedidoCompra.pageCount = event.rows;
      this.getPedidosCompra(true);
    }
  }

  clickDeleted(id: number) {
    if (!this.queryService.pedidoCompra.deleted) {
      this.router.navigate([`home/pedidoscompras/${id}`]);
    } else {
      this.confirm(id);
    }
  }

  confirm(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja restaurar esse pedido de compra?',
      accept: () => {
        this.pedidoCompraService.restorePedidoCompra(id).subscribe({
          error: (error: any) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao restaurar o pedido de compra. - ' + error.error.message,
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
      this.queryService.pedidoCompra.searchValue?.length! > 2 ||
      this.queryService.pedidoCompra.searchValue?.length! === 0
    )
      this.getPedidosCompra();
  }
}
