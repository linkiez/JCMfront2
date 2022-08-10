import { AccessTokenService } from 'src/app/authentication/accessToken.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Login } from './login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private accessTokenService: AccessTokenService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authenticationService.autenticar(this.email, this.senha).subscribe(
      (response)=> {
        let body= response.body as Login

        this.accessTokenService.salvaToken(body!.accessToken)
        this.router.navigate(['home']);
      },
      (error) => {
        alert('Usuario ou senha invalido')
        console.log(error);
      }
    )
  }
}
