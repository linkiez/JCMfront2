import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosComprasRoutingModule } from './pedidoscompras-routing.module';
import { PedidosComprasComponent } from './pedidoscompras.component';
import { PedidoCompraComponent } from './pedidocompra/pedidocompra.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PaginatorModule} from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


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
    CheckboxModule,
    SharedModule,
    AutoCompleteModule,
    DropdownModule,
    CalendarModule
  ]
})
export class PedidosComprasModule { }
