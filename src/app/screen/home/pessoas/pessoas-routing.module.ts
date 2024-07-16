import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login.guard';
import { PessoaComponent } from './pessoa/pessoa.component';
import { PessoasComponent } from './pessoas.component';

const routes: Routes = [{
  path: '',
  component: PessoasComponent,
  canActivate: [LoginGuard]
},{
  path: ':id',
  component: PessoaComponent,
  canActivate: [LoginGuard],
  data: { title: 'Pessoa'}
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
