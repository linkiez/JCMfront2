import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './site.component';

const routes: Routes = [
  { path: '', component: SiteComponent, children: [
    { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
