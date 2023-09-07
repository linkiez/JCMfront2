import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicosRoutingModule } from './servicos-routing.module';
import { ServicosComponent } from './servicos.component';
import { CardModule } from '../../components/card/card.module';
import { ButtonSaibaMaisModule } from '../../components/button-saiba-mais/button-saiba-mais.module';

@NgModule({
  declarations: [ServicosComponent],
  imports: [
    CommonModule,
    ServicosRoutingModule,
    CardModule,
    ButtonSaibaMaisModule,
  ],
})
export class ServicosModule {}
