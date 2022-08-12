import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/authentication/usuario';
import { UsuarioService } from 'src/app/authentication/usuario.service';

@Component({
  selector: 'app-caixa-usuario',
  templateUrl: './caixa-usuario.component.html',
  styleUrls: ['./caixa-usuario.component.scss']
})
export class CaixaUsuarioComponent implements OnInit {

  usuario: Usuario = {}

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario()
    console.log(this.usuario)
  }

  logout() {
    this.usuarioService.logout()
  }
}
