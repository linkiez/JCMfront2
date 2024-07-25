import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { OrdemProducaoComponent } from './ordem-producao/ordem-producao.component';
import { OrdensProducaoComponent } from './ordens-producao.component';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [
  {
    path: '',
    component: OrdensProducaoComponent,
    canActivate: [LoginGuard, AccessGuard(['ordemProducao', 'findAll'])],
  },
  {
    path: ':id',
    component: OrdemProducaoComponent,
    canActivate: [LoginGuard, AccessGuard(['ordemProducao', 'findOne'])],
    data: { title: 'Ordem de Produção'},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdensProducaoRoutingModule { }
