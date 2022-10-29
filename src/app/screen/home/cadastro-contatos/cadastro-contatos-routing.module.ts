import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContatosComponent } from './cadastro-contatos.component';
import { ContatoComponent } from './contato/contato.component';

const routes: Routes = [{
    path: '',
    component: CadastroContatosComponent
  },

  {
    path: ':id',
    component: ContatoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroContatosRoutingModule { }
