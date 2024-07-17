import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { OrcamentosComponent } from './orcamentos.component';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [
  {
    path: '',
    component: OrcamentosComponent,
    canActivate: [LoginGuard, AccessGuard(['orcamento', 'findAll'])],
  },
  {
    path: ':id',
    component: OrcamentoComponent,
    canActivate: [LoginGuard, AccessGuard(['orcamento', 'findOne'])],
    data: { title: 'Orçamento' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentosRoutingModule {}
