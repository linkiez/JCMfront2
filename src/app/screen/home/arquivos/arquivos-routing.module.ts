import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArquivosComponent } from './arquivos.component';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [
  {
    path: '',
    component: ArquivosComponent,
    canActivate: [LoginGuard, AccessGuard(['file', 'findAll'])],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArquivosRoutingModule { }
