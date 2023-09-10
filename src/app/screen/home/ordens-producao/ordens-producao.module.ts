import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { OrdensProducaoRoutingModule } from './ordens-producao-routing.module';
import { OrdensProducaoComponent } from './ordens-producao.component';
import { OrdemProducaoComponent } from './ordem-producao/ordem-producao.component';
import { ListaFilesModule } from 'src/app/components/listaFiles/listaFiles.module';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { CaixaDeStatusModule } from 'src/app/components/caixaDeStatus/caixaDeStatus.module';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'src/app/authentication/authentication.interceptor';


@NgModule({
  declarations: [OrdensProducaoComponent, OrdemProducaoComponent],
  imports: [
    CommonModule,
    OrdensProducaoRoutingModule,
    ListaFilesModule,
    EditorModule,
    FormsModule,
    ConfirmDialogModule,
    PaginatorModule,
    CardModule,
    CaixaDeStatusModule,
    CalendarModule,
    ListboxModule,
    InputTextModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [ConfirmationService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptor,
        multi: true,
      }],
})
export class OrdensProducaoModule {}
