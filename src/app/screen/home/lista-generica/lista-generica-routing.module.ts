import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGenericaComponent } from './lista-generica.component';

const routes: Routes = [
  {
    path: '',
    component: ListaGenericaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaGenericaRoutingModule { }
