import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListaGenericaRoutingModule } from './lista-generica-routing.module';
import { ListaGenericaComponent } from './lista-generica.component';

import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';




@NgModule({
  declarations: [ListaGenericaComponent],
  imports: [
    CommonModule,
    ListaGenericaRoutingModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
  ]
})
export class ListaGenericaModule { }
