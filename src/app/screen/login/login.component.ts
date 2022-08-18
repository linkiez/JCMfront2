import { AccessTokenService } from 'src/app/authentication/accessToken.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Login } from './login';
import { UsuarioService } from 'src/app/authentication/usuario.service';

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
    private accessTokenService: AccessTokenService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authenticationService.login(this.email, this.senha).subscribe(
      {
        next:(response) => {
          let body = response.body as Login;
          console.log(body)
          this.usuarioService.salvaToken(body!.accessToken, body!.refreshToken);


        },
        error:(error) => {
          alert('Usuario ou senha invalido');
          console.log(error);
        },
        complete: () => this.router.navigate(['home'])
      }


    );
  }
}
