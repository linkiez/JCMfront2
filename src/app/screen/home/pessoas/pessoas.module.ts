import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas.component';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CpfCnpjPipe } from 'src/app/utils/cpfCnpj.pipe';
import { TelefonePipe } from 'src/app/utils/telefone.pipe';
import { PessoaComponent } from './pessoa/pessoa.component';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IeRgPipe } from 'src/app/utils/ieRg.pipe';

@NgModule({
  declarations: [PessoasComponent, CpfCnpjPipe, TelefonePipe, PessoaComponent, IeRgPipe],
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
  ],
})
export class PessoasModule {}
