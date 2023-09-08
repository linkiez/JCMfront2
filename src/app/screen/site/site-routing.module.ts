import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
        data: { title: 'Home Page' },
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./pages/produtos/produtos.module').then(
            (m) => m.ProdutosModule
          ),
        data: { title: 'Produtos' },
      },
      {
        path: 'servicos',
        loadChildren: () =>
          import('./pages/servicos/servicos.module').then(
            (m) => m.ServicosModule
          ),
        data: { title: 'Serviços' },
      },
      {
        path: 'trabalhe',
        loadChildren: () =>
          import('./pages/trabalhe/trabalhe.module').then(
            (m) => m.TrabalheModule
          ),
        data: { title: 'Trabalhe Conosco' },
      },
      {
        path: 'contato',
        loadChildren: () =>
          import('./pages/contato/contato.module').then((m) => m.ContatoModule),
        data: { title: 'Contato' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
