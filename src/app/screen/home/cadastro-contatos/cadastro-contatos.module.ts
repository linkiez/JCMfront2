import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroContatosRoutingModule } from './cadastro-contatos-routing.module';
import { CadastroContatosComponent } from './cadastro-contatos.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [CadastroContatosComponent],
  imports: [
    CommonModule,
    CadastroContatosRoutingModule,
    TableModule
  ]
})
export class CadastroContatosModule { }
