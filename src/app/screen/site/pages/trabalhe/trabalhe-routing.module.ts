import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabalheComponent } from './trabalhe.component';

const routes: Routes = [
  { path: '', component: TrabalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabalheRoutingModule { }
