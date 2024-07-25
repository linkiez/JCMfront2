import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RirComponent } from './rir.component';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [
  {
    path: '',
    component: RirComponent,
    canActivate: [LoginGuard, AccessGuard(['rir', 'findAll'])],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RirRoutingModule { }
