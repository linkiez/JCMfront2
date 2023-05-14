import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RirRoutingModule } from './rir-routing.module';
import { RirComponent } from './rir.component';


@NgModule({
  declarations: [
    RirComponent
  ],
  imports: [
    CommonModule,
    RirRoutingModule
  ]
})
export class RirModule { }
