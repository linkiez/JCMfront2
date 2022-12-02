import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaFilesComponent } from './listaFiles.component';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ProgressSpinnerModule,
  ],
  declarations: [ListaFilesComponent],
  exports: [ListaFilesComponent]
})
export class ListaFilesModule { }
