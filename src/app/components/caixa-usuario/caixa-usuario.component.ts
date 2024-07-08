import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/authentication/usuario.service';
import { IUsuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-caixa-usuario',
  templateUrl: './caixa-usuario.component.html',
  styleUrls: ['./caixa-usuario.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaixaUsuarioComponent implements OnInit, OnDestroy {
  usuario: IUsuario = null;
  usuario$: Observable<IUsuario>;
  usuarioSubscription: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuario$ = this.usuarioService.getUsuario$();
    this.usuarioSubscription = this.usuario$.subscribe((usuario) => {
      this.usuario = usuario;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.usuarioSubscription.unsubscribe();
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['login']);
  }
}
