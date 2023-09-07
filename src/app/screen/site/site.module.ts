import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { HeaderModule } from './components/header/header.module';
import { FooterModule } from './components/footer/footer.module';
import { ButtonWhatsappModule } from './components/button-whatsapp/button-whatsapp.module';


@NgModule({
  declarations: [
    SiteComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    HeaderModule,
    FooterModule,
    ButtonWhatsappModule
  ]
})
export class SiteModule { }
