import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/authentication/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-caixa-usuario',
  templateUrl: './caixa-usuario.component.html',
  styleUrls: ['./caixa-usuario.component.scss']
})
export class CaixaUsuarioComponent implements OnInit {

  usuario: Usuario = {}

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario()
  }

  logout() {
    this.usuarioService.logout()
    this.router.navigate(['login'])
  }
}
