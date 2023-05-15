import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RirRoutingModule } from './rir-routing.module';
import { RirComponent } from './rir.component';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ListaFilesModule } from 'src/app/components/listaFiles/listaFiles.module';



@NgModule({
  declarations: [
    RirComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RirRoutingModule,
    InputTextModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    ListaFilesModule
  ]
})
export class RirModule { }
