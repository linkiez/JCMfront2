import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosComponent } from './contatos.component';
import { TableModule } from 'primeng/table';
import { ContatoComponent } from './contato/contato.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContatosComponent, ContatoComponent],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    TableModule,
    MessagesModule,
    MessageModule,
    FormsModule,
    ConfirmDialogModule,
  ],
})
export class ContatosModule {}
