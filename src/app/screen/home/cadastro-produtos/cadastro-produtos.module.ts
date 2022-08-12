import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroProdutosRoutingModule } from './cadastro-produtos-routing.module';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CadastroProdutosComponent } from './cadastro-produtos.component';

@NgModule({
  declarations: [CadastroProdutosComponent],
  imports: [
    CommonModule,
    CadastroProdutosRoutingModule,
    TableModule,
    MessagesModule,
    MessageModule
  ]
})
export class CadastroProdutosModule { }
