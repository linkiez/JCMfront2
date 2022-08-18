import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContatosComponent } from './cadastro-contatos.component';

const routes: Routes = [{
  path: '',
  component: CadastroContatosComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroContatosRoutingModule { }
