import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { ProdutosComponent } from './produtos.component';
import { ProdutoComponent } from './produto/produto.component';


const routes: Routes = [
  {
    path: '',
    component: ProdutosComponent,
    canActivate: [LoginGuard]
  },

  {
    path: ':id',
    component: ProdutoComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroProdutosRoutingModule { }
