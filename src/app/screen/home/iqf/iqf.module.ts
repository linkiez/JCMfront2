import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IqfRoutingModule } from './iqf-routing.module';
import { ChartModule } from 'primeng/chart';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IqfComponent } from './iqf.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'src/app/authentication/authentication.interceptor';


@NgModule({
  declarations: [IqfComponent],
  imports: [CommonModule, IqfRoutingModule, ChartModule, AutoCompleteModule, FormsModule, ButtonModule, InputTextModule, TableModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }]
})
export class IqfModule {}
