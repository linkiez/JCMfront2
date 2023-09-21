import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import e from 'express';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { iFormSite } from 'src/app/models/form-site';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent {
  @ViewChild('form', { static: false }) signupForm!: NgForm;

  button: boolean = false;

  formData: iFormSite = {
    name: '',
    email: '',
    tel: '',
    message: '',
  };

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private http: HttpClient
  ) {}

  sendEmail(event: Event): void {
    this.button = true;
    event.preventDefault();

    this.recaptchaV3Service.execute('importantAction').subscribe({
      next: (token) => {
        this.formData.token = token;
        this.sendHttp(this.formData).subscribe({
          next: (data) => {
            this.button = false;
            this.signupForm.reset();
            alert('Mensagem enviada com sucesso!');
          },
          error: (error) => {
            console.error(error);
            this.button = false;
            alert('Erro ao enviar mensagem!');
          },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  sendHttp(formData: iFormSite): Observable<iFormSite> {
    return this.http.post<iFormSite>(
      environment.backendURL + 'form-site',
      formData
    );
  }
}
