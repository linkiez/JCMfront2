import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { ButtonSaibaMaisModule } from '../button-saiba-mais/button-saiba-mais.module';



@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    ButtonSaibaMaisModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
