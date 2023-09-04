import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
  
})
export class ContatoComponent {

  button: boolean = false;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  sendEmail(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => {
        console.log(token);
      });
  }
}
