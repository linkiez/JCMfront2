import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroProdutosRoutingModule } from './cadastro-produtos-routing.module';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CadastroProdutosComponent } from './cadastro-produtos.component';
import { ProdutoComponent } from './produto/produto.component';
import { FormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [CadastroProdutosComponent, ProdutoComponent],
  imports: [
    CommonModule,
    CadastroProdutosRoutingModule,
    TableModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ConfirmDialogModule,
    DropdownModule
  ]
})
export class CadastroProdutosModule { }
