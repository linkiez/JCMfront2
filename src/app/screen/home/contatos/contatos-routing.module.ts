import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos.component';
import { ContatoComponent } from './contato/contato.component';
import { LoginGuard } from 'src/app/authentication/login.guard';

const routes: Routes = [
  {
    path: '',
    component: ContatosComponent,
    canActivate: [LoginGuard],
  },

  {
    path: ':id',
    component: ContatoComponent,
    data: { title: 'Contato' },
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatosRoutingModule {}
