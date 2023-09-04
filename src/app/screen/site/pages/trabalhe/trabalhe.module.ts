import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabalheRoutingModule } from './trabalhe-routing.module';
import { TrabalheComponent } from './trabalhe.component';


@NgModule({
  declarations: [
    TrabalheComponent
  ],
  imports: [
    CommonModule,
    TrabalheRoutingModule
  ]
})
export class TrabalheModule { }
