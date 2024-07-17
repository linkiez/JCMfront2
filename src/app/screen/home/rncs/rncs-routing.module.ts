import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RNCsComponent } from './rncs.component';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { RNCComponent } from './rnc/rnc.component';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [
  {
    path: '',
    component: RNCsComponent,
    canActivate: [LoginGuard, AccessGuard(['rnc', 'findAll'])],
  },

  {
    path: ':id',
    component: RNCComponent,
    canActivate: [LoginGuard, AccessGuard(['rnc', 'findOne'])],
    data: { title: 'RNC' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RNCsRoutingModule { }
