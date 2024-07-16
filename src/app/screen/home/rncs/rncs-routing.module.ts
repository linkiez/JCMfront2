import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RNCsComponent } from './rncs.component';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { RNCComponent } from './rnc/rnc.component';

const routes: Routes = [
  {
    path: '',
    component: RNCsComponent,
    canActivate: [LoginGuard]
  },

  {
    path: ':id',
    component: RNCComponent,
    canActivate: [LoginGuard],
    data: { title: 'RNC' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RNCsRoutingModule { }
