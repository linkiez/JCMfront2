import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroProdutosRoutingModule } from './produtos-routing.module';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProdutosComponent } from './produtos.component';
import { ProdutoComponent } from './produto/produto.component';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PaginatorModule} from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { ListaFilesModule } from 'src/app/components/listaFiles/listaFiles.module';



@NgModule({
  declarations: [ProdutosComponent, ProdutoComponent],
  imports: [
    CommonModule,
    CadastroProdutosRoutingModule,
    TableModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ConfirmDialogModule,
    DropdownModule,
    PaginatorModule,
    CheckboxModule,
    ListaFilesModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class ProdutosModule { }
