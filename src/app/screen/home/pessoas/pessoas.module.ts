import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';


import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas.component';

import { TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import { CpfCnpjPipe } from 'src/app/utils/cpfCnpj.pipe';
import { TelefonePipe } from 'src/app/utils/telefone.pipe';




@NgModule({
  declarations: [
    PessoasComponent,
    CpfCnpjPipe,
    TelefonePipe
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    TableModule,
    MultiSelectModule,
    FormsModule
  ]
})
export class PessoasModule { }
