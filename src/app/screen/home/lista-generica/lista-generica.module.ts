import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListaGenericaRoutingModule } from './lista-generica-routing.module';
import { ListaGenericaComponent } from './lista-generica.component';

import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'src/app/authentication/authentication.interceptor';




@NgModule({
  declarations: [ListaGenericaComponent],
  imports: [
    CommonModule,
    ListaGenericaRoutingModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }]
})
export class ListaGenericaModule { }
