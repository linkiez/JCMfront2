import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RirComponent } from './rir.component';
import { LoginGuard } from 'src/app/authentication/login.guard';

const routes: Routes = [
  {
    path: '',
    component: RirComponent,
    canActivate: [LoginGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RirRoutingModule { }
