import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { OrdemProducaoComponent } from './ordem-producao/ordem-producao.component';
import { OrdensProducaoComponent } from './ordens-producao.component';

const routes: Routes = [
  {
    path: '',
    component: OrdensProducaoComponent,
    canActivate: [LoginGuard],
  },
  {
    path: ':id',
    component: OrdemProducaoComponent,
    canActivate: [LoginGuard],
    data: { title: 'Ordem de Produção'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdensProducaoRoutingModule { }
