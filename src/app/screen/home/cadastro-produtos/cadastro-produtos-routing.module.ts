import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutosComponent } from './cadastro-produtos.component';
import { ProdutoComponent } from './produto/produto.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroProdutosComponent
  },

  {
    path: ':id',
    component: ProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroProdutosRoutingModule { }
