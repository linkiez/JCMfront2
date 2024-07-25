import { DEFAULT_CURRENCY_CODE, inject, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common'


import { LoginComponent } from './screen/login/login.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(ptBr);
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { HeaderModule } from './screen/site/components/header/header.module';
import { FooterModule } from './screen/site/components/footer/footer.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MessageModule,
    MessagesModule,
    NgOptimizedImage,
    HeaderModule,
    FooterModule,
    ButtonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
