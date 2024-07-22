import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
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
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ]
})
export class ArquivosModule { }
