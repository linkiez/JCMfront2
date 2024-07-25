import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { ProdutosComponent } from './produtos.component';
import { ProdutoComponent } from './produto/produto.component';
import { AccessGuard } from 'src/app/authentication/access.guard';


const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    canActivate: [LoginGuard, AccessGuard(['produto', 'findAll'])],
  },

  {
    path: ':id',
    component: ProdutoComponent,
    canActivate: [LoginGuard, AccessGuard(['produto', 'findOne'])],
    data: { title: 'Produto'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroProdutosRoutingModule { }
