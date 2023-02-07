import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { OrdensProducaoRoutingModule } from './ordens-producao-routing.module';
import { OrdensProducaoComponent } from './ordens-producao.component';
import { OrdemProducaoComponent } from './ordem-producao/ordem-producao.component';
import { ListaFilesModule } from 'src/app/components/listaFiles/listaFiles.module';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [OrdensProducaoComponent, OrdemProducaoComponent],
  imports: [
    CommonModule,
    OrdensProducaoRoutingModule,
    ListaFilesModule,
    EditorModule,
    FormsModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
})
export class OrdensProducaoModule {}
