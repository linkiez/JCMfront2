import { FormsModule } from '@angular/forms';
import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RNCsRoutingModule } from './rncs-routing.module';
import { RNCsComponent } from '../rncs/rncs.component';
import { RNCComponent } from './rnc/rnc.component';
import { InputTextModule } from 'primeng/inputtext';
import { CaixaDeStatusModule } from 'src/app/components/caixaDeStatus/caixaDeStatus.module';


@NgModule({
  declarations: [
    RNCsComponent,
    RNCComponent
  ],
  imports: [
    CommonModule,
    RNCsRoutingModule,
    FormsModule,
    InputTextModule,
    CaixaDeStatusModule
  ]
})
export class RNCsModule { }
