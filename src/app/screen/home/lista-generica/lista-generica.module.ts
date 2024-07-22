import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListaGenericaRoutingModule } from './lista-generica-routing.module';
import { ListaGenericaComponent } from './lista-generica.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ListaGenericaComponent],
  imports: [
    CommonModule,
    ListaGenericaRoutingModule,
    TableModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class ListaGenericaModule {}
