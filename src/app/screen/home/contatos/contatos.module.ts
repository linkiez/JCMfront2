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
import { PaginatorModule } from 'primeng/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'src/app/authentication/authentication.interceptor';

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
    PaginatorModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }]
})
export class ContatosModule {}
