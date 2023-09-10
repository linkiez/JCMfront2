import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoComponent } from './contato.component';

import { RecaptchaFormsModule } from "ng-recaptcha";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContatoComponent
  ],
  imports: [
    CommonModule,
    ContatoRoutingModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    FormsModule
  ],
  providers: [{
    provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcKIQQoAAAAAAkPSJmIpBLBKp8_IUmwcwD_ZnJH'
  },
]
})
export class ContatoModule { }
