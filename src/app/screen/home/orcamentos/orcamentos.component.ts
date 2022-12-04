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

  orcamentos: Orcamento = {}

  constructor() { }

  ngOnDestroy(): void {
  }

  ngOnInit() {
  }

}
