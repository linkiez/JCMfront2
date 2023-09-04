import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './authentication/login.guard';
import { LoginComponent } from './screen/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screen/site/site.module').then((module) => module.SiteModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./screen/home/home.module').then((module) => module.HomeModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
