import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaixaDeStatusComponent } from './caixaDeStatus.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
  ],
  declarations: [CaixaDeStatusComponent],
  exports: [CaixaDeStatusComponent]
})
export class CaixaDeStatusModule { }
