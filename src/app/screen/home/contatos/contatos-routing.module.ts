import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [
  {
    path: '',
    component: ContatosComponent,
    canActivate: [LoginGuard, AccessGuard(['contato', 'findAll'])],
  },

  {
    path: ':id',
    component: ContatoComponent,
    data: { title: 'Contato' },
    canActivate: [LoginGuard, AccessGuard(['contato', 'findOne'])],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatosRoutingModule {}
