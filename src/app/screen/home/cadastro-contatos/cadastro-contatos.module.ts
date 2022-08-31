import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroContatosRoutingModule } from './cadastro-contatos-routing.module';
import { CadastroContatosComponent } from './cadastro-contatos.component';
import { TableModule } from 'primeng/table';
import { ContatoComponent } from './contato/contato.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CadastroContatosComponent, ContatoComponent],
  imports: [
    CommonModule,
    CadastroContatosRoutingModule,
    TableModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ConfirmDialogModule,
  ]
})
export class CadastroContatosModule { }
