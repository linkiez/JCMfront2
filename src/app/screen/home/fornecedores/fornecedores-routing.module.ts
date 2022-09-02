import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaComponent } from '../pessoas/pessoa/pessoa.component';
import { FornecedoresComponent } from './fornecedores.component';

const routes: Routes = [{
    path: '',
    component: FornecedoresComponent
  },
  {
    path: ':id',
    component: PessoaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
