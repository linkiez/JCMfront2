import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicosComponent } from './servicos.component';
import { CardModule } from '../../components/card/card.module';

@NgModule({
  declarations: [ServicosComponent],
  imports: [CommonModule, ServicosRoutingModule, CardModule],
})
export class ServicosModule {}
