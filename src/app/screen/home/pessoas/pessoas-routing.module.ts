import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { PessoaComponent } from './pessoa/pessoa.component';
import { PessoasComponent } from './pessoas.component';
import { AccessGuard } from 'src/app/authentication/access.guard';

const routes: Routes = [{
  path: '',
  component: PessoasComponent,
    canActivate: [LoginGuard, AccessGuard(['pessoa', 'findAll'])],
},{
  path: ':id',
  component: PessoaComponent,
    canActivate: [LoginGuard, AccessGuard(['pessoa', 'findOne'])],
  data: { title: 'Pessoa'}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
