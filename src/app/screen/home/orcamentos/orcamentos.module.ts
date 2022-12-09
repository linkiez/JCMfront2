import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { OrcamentosRoutingModule } from './orcamentos-routing.module';
import { OrcamentosComponent } from './orcamentos.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CaixaDeStatusModule } from 'src/app/components/caixaDeStatus/caixaDeStatus.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';


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
    MultiSelectModule
  ]
})
export class OrcamentosModule { }
