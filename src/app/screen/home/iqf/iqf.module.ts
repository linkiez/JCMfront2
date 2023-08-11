import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IqfRoutingModule } from './iqf-routing.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IqfRoutingModule,
    ChartModule
  ]
})
export class IqfModule { }
