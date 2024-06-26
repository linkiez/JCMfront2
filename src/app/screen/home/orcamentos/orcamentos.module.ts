import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrcamentosRoutingModule } from './orcamentos-routing.module';
import { OrcamentosComponent } from './orcamentos.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CaixaDeStatusModule } from 'src/app/components/caixaDeStatus/caixaDeStatus.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ListaFilesModule } from 'src/app/components/listaFiles/listaFiles.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
  declarations: [OrcamentosComponent, OrcamentoComponent],
  imports: [
    CommonModule,
    FormsModule,
    OrcamentosRoutingModule,
    CaixaDeStatusModule,
    AutoCompleteModule,
    SharedModule,
    DropdownModule,
    TableModule,
    CheckboxModule,
    MultiSelectModule,
    ConfirmDialogModule,
    ListaFilesModule,
    PaginatorModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ProgressSpinnerModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  providers: [ConfirmationService],
})
export class OrcamentosModule {}
