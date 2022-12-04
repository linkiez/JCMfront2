import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing.module';
import { OrcamentosComponent } from './orcamentos.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';

import { CaixaDeStatusModule } from 'src/app/components/caixaDeStatus/caixaDeStatus.module';



@NgModule({
  declarations: [OrcamentosComponent, OrcamentoComponent],
  imports: [
    CommonModule,
    OrcamentosRoutingModule,
    CaixaDeStatusModule
  ]
})
export class OrcamentosModule { }
