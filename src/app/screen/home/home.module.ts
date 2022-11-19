import {LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { HomeComponent } from './home.component';

import {DashboardComponent } from './dashboard/dashboard.component';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { CaixaUsuarioComponent } from 'src/app/components/caixa-usuario/caixa-usuario.component';



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
    MessageModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' }
  ],
})
export class HomeModule {}
