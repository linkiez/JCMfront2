import { AccessTokenService } from 'src/app/authentication/accessToken.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Login } from '../../models/login';
import { UsuarioService } from 'src/app/authentication/usuario.service';
import {Message,MessageService} from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authenticationService.login(this.email, this.senha).subscribe(
      {
        next:(response) => {
          let body = response.body as Login;
          this.usuarioService.salvaToken(body!.accessToken, body!.refreshToken);


        },
        error:(error) => {
          this.messageService.add({severity:'error', summary:'Erro', detail:error.message})
          console.log(error);
        },
        complete: () => this.router.navigate(['home'])
      }


    );
  }
}
