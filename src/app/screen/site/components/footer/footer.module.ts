import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
