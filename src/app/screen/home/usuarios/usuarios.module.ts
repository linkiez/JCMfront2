import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    InputTextModule,
    AutoCompleteModule,
    SharedModule,
    ConfirmDialogModule,
    CheckboxModule,
    TableModule,
    PaginatorModule
  ],
  providers: [
    ConfirmationService
  ],
})
export class UsuariosModule { }
