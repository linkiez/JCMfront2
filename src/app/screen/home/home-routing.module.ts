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
          import('./cadastro-produtos/cadastro-produtos.module').then(
            (module) => module.CadastroProdutosModule
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), MenubarModule, MenuModule],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
