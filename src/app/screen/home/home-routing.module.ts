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
        canActivate: [LoginGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('./produtos/produtos.module').then(
            (module) => module.ProdutosModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Produtos' },
      },
      {
        path: 'pessoas',
        loadChildren: () =>
          import('./pessoas/pessoas.module').then(
            (module) => module.PessoasModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Pessoas' },
      },
      {
        path: 'contatos',
        loadChildren: () =>
          import('./contatos/contatos.module').then(
            (module) => module.ContatosModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Contatos' },
      },
      {
        path: 'listagenerica',
        loadChildren: () =>
          import('./lista-generica/lista-generica.module').then(
            (module) => module.ListaGenericaModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Configurações' },
      },
      {
        path: 'arquivos',
        loadChildren: () =>
          import('./arquivos/arquivos.module').then(
            (module) => module.ArquivosModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Arquivos' },
      },
      {
        path: 'pedidoscompras',
        loadChildren: () =>
          import('./pedidoscompras/pedidoscompras.module').then(
            (module) => module.PedidosComprasModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Pedidos de Compras' },
      },
      {
        path: 'orcamentos',
        loadChildren: () =>
          import('./orcamentos/orcamentos.module').then(
            (module) => module.OrcamentosModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Orçamentos' },
      },
      {
        path: 'ordensproducao',
        loadChildren: () =>
          import('./ordens-producao/ordens-producao.module').then(
            (module) => module.OrdensProducaoModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Ordens de Produção' },
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then(
            (module) => module.UsuariosModule
          ),
        canLoad: [LoginGuard],
        data: { title: 'Usuários' },
      },
      {
        path: 'rir',
        loadChildren: () =>
          import('./rir/rir.module').then((module) => module.RirModule),
        canLoad: [LoginGuard],
        data: { title: 'RIR' },
      },
      {
        path: 'iqf',
        loadChildren: () =>
          import('./iqf/iqf.module').then((module) => module.IqfModule),
        canLoad: [LoginGuard],
        data: { title: 'IQF' },
      },
      {
        path: 'rnc',
        loadChildren: () =>
          import('./rncs/rncs.module').then((module) => module.RNCsModule),
        canLoad: [LoginGuard],
        data: { title: 'RNCs' },
      },
      {
        path: '*',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MenubarModule, MenuModule],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
