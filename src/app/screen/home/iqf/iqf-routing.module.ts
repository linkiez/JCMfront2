import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IqfComponent } from './iqf.component';

const routes: Routes = [
  {
    path: '',
    component: IqfComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IqfRoutingModule { }
