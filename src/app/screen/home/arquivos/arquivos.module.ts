import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArquivosRoutingModule } from './arquivos-routing.module';
import { ArquivosComponent } from './arquivos.component';

import { TableModule } from 'primeng/table';
import {ConfirmPopupModule} from 'primeng/confirmpopup';


@NgModule({
  declarations: [
    ArquivosComponent
  ],
  imports: [
    CommonModule,
    ArquivosRoutingModule,
    TableModule,
    ConfirmPopupModule
  ]
})
export class ArquivosModule { }
