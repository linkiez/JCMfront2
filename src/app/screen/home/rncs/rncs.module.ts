import { FormsModule } from '@angular/forms';
import { DEFAULT_CURRENCY_CODE, Input, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RNCsRoutingModule } from './rncs-routing.module';
import { RNCsComponent } from '../rncs/rncs.component';
import { RNCComponent } from './rnc/rnc.component';
import { InputTextModule } from 'primeng/inputtext';
import { CaixaDeStatusModule } from 'src/app/components/caixaDeStatus/caixaDeStatus.module';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IshikawaModule } from 'src/app/components/ishikawa/ishikawa.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import {PaginatorModule} from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

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
    CaixaDeStatusModule,
    ButtonModule,
    AutoCompleteModule,
    TableModule,
    DialogModule,
    EditorModule,
    DropdownModule,
    InputTextareaModule,
    IshikawaModule,
    RadioButtonModule,
    PaginatorModule,
    CheckboxModule,
    ConfirmDialogModule

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class RNCsModule { }
