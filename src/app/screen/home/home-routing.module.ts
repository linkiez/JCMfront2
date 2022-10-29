import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from 'src/app/authentication/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./produtos/produtos.module').then(
            (module) => module.ProdutosModule
          ),
        canLoad: [LoginGuard],
      },
      {
        path: 'pessoas',
        loadChildren: () =>
          import('./pessoas/pessoas.module').then(
            (module) => module.PessoasModule
          ),
        canLoad: [LoginGuard],
      },
      {
        path: 'contatos',
        loadChildren: () =>
          import('./cadastro-contatos/cadastro-contatos.module').then(
            (module) => module.CadastroContatosModule
          ),
        canLoad: [LoginGuard],
      },
      {
        path: 'listagenerica',
        loadChildren: () =>
          import('./lista-generica/lista-generica.module').then(
            (module) => module.ListaGenericaModule
          ),
        canLoad: [LoginGuard],
      },
      {
        path: 'arquivos',
        loadChildren: () =>
          import('./arquivos/arquivos.module').then(
            (module) => module.ArquivosModule
          ),
        canLoad: [LoginGuard],
      },
      {
        path: 'pedidoscompras',
        loadChildren: () =>
          import('./pedidoscompras/pedidoscompras.module').then(
            (module) => module.PedidosComprasModule
          ),
      },
      {
        path: 'fornecedores',
        loadChildren: () =>
          import('./fornecedores/fornecedores.module').then(
            (module) => module.FornecedoresModule
          ),
        canLoad: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MenubarModule, MenuModule],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
