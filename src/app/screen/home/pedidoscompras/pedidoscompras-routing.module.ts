import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { PedidoCompraComponent } from './pedidocompra/pedidocompra.component';
import { PedidosComprasComponent } from './pedidoscompras.component';

const routes: Routes = [{
  path: '',
  component: PedidosComprasComponent,
  canActivate: [LoginGuard]
},
{
  path: ':id',
  component: PedidoCompraComponent,
  canActivate: [LoginGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosComprasRoutingModule { }
