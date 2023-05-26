import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos.component';
import { ContatoComponent } from './contato/contato.component';

const routes: Routes = [
  {
    path: '',
    component: ContatosComponent,
  },

  {
    path: ':id',
    component: ContatoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatosRoutingModule {}
