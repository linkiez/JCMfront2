import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NgOptimizedImage
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
