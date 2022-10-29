import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosComprasRoutingModule } from './pedidoscompras-routing.module';
import { PedidosComprasComponent } from './pedidoscompras.component';
import { PedidoCompraComponent } from './pedidocompra/pedidocompra.component';


@NgModule({
  declarations: [
    PedidosComprasComponent,
    PedidoCompraComponent
  ],
  imports: [
    CommonModule,
    PedidosComprasRoutingModule
  ]
})
export class PedidosComprasModule { }
