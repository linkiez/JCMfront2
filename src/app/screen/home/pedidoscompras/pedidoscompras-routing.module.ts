import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { PedidoCompraComponent } from './pedidocompra/pedidocompra.component';
import { PedidosComprasComponent } from './pedidoscompras.component';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [{
  path: '',
  component: PedidosComprasComponent,
      canActivate: [LoginGuard, AccessGuard(['pedidoCompra', 'findAll'])],
},
{
  path: ':id',
  component: PedidoCompraComponent,
      canActivate: [LoginGuard, AccessGuard(['pedidoCompra', 'findOne'])],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosComprasRoutingModule { }
