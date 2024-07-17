import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AccessGuard } from 'src/app/authentication/access.guard';


const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    canActivate: [LoginGuard, AccessGuard(['usuario', 'findAll'])],
  },
  {
    path: ':id',
    component: UsuarioComponent,
    canActivate: [LoginGuard, AccessGuard(['usuario', 'findOne'])],
    data: { title: 'Usuário' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
