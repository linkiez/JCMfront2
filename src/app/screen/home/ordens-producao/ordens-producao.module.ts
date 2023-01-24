import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdensProducaoRoutingModule } from './ordens-producao-routing.module';
import { OrdensProducaoComponent } from './ordens-producao.component';
import { OrdemProducaoComponent } from './ordem-producao/ordem-producao.component';


@NgModule({
  declarations: [OrdensProducaoComponent, OrdemProducaoComponent],
  imports: [
    CommonModule,
    OrdensProducaoRoutingModule
  ]
})
export class OrdensProducaoModule { }
