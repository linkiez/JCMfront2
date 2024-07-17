import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGenericaComponent } from './lista-generica.component';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [
  {
    path: '',
    component: ListaGenericaComponent,
    canActivate: [LoginGuard, AccessGuard(['listaGenerica', 'findAll'])],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaGenericaRoutingModule { }
