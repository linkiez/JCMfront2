import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSaibaMaisComponent } from './button-saiba-mais.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ButtonSaibaMaisComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonSaibaMaisComponent
  ]
})
export class ButtonSaibaMaisModule { }
