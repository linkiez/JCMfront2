import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MessageService, SharedModule } from 'primeng/api';
import { HomeComponent } from './home.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CaixaUsuarioComponent } from 'src/app/components/caixa-usuario/caixa-usuario.component';
import {ToastModule} from 'primeng/toast';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from 'src/app/authentication/authentication.interceptor';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [HomeComponent, CaixaUsuarioComponent, DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MenuModule,
    MenubarModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ],
  providers: [
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
],
})
export class HomeModule {}
