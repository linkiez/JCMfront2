import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IqfComponent } from './iqf.component';
import { LoginGuard } from 'src/app/authentication/login.guard';

const routes: Routes = [
  {
    path: '',
    component: IqfComponent,
    canActivate: [LoginGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IqfRoutingModule { }
