import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas.component';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { PessoaComponent } from './pessoa/pessoa.component';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaFilesModule } from 'src/app/components/listaFiles/listaFiles.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [PessoasComponent, PessoaComponent],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    AccordionModule,
    CheckboxModule,
    InputTextareaModule,
    CalendarModule,
    ConfirmDialogModule,
    FileUploadModule,
    DropdownModule,
    ProgressSpinnerModule,
    PaginatorModule,
    SharedModule,
    ListaFilesModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  providers: [
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
})
export class PessoasModule {}
