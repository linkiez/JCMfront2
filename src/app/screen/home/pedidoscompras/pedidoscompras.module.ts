import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosComprasRoutingModule } from './pedidoscompras-routing.module';
import { PedidosComprasComponent } from './pedidoscompras.component';
import { PedidoCompraComponent } from './pedidocompra/pedidocompra.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PaginatorModule} from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';



@NgModule({
  declarations: [
    PedidosComprasComponent,
    PedidoCompraComponent
  ],
  imports: [
    CommonModule,
    PedidosComprasRoutingModule,
    ConfirmDialogModule,
    PaginatorModule,
    TableModule,
    CheckboxModule
  ]
})
export class PedidosComprasModule { }
