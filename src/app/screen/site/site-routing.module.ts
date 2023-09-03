import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site.component';

const routes: Routes = [
  { path: '', component: SiteComponent, children: [
    { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    {
      path: 'produtos', loadChildren: () => import('./pages/produtos/produtos.module').then(m => m.ProdutosModule)
    },
    {
      path: 'servicos', loadChildren: () => import('./pages/servicos/servicos.module').then(m => m.ServicosModule)
    }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
