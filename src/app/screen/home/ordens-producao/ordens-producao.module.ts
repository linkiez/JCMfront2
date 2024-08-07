import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';

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
    AutoCompleteModule,
    DialogModule,
  ],
  providers: [
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class OrdensProducaoModule {}
