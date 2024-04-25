import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/authentication/usuario.service';
import { IUsuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-caixa-usuario',
  templateUrl: './caixa-usuario.component.html',
  styleUrls: ['./caixa-usuario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaixaUsuarioComponent implements OnInit {
  usuario: IUsuario = {};

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['login']);
  }
}
