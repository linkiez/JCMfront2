import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MenubarModule, MenuModule],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
