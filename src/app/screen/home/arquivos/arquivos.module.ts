import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArquivosRoutingModule } from './arquivos-routing.module';
import { ArquivosComponent } from './arquivos.component';

import { TableModule } from 'primeng/table';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'src/app/authentication/authentication.interceptor';


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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }]
})
export class ArquivosModule { }
