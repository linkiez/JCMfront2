import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { OrcamentosComponent } from './orcamentos.component';

const routes: Routes = [
  {
    path: '',
    component: OrcamentosComponent,
    canActivate: [LoginGuard],
  },
  {
    path: ':id',
    component: OrcamentoComponent,
    canActivate: [LoginGuard],
    data: { title: 'Orçamento' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentosRoutingModule {}
