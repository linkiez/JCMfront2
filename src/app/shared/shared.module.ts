import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelefonePipe } from 'src/app/utils/telefone.pipe';
import { CepPipe } from 'src/app/utils/cep.pipe';
import { CpfCnpjPipe } from 'src/app/utils/cpfCnpj.pipe';
import { IeRgPipe } from 'src/app/utils/ieRg.pipe';


@NgModule({
  declarations: [TelefonePipe, CepPipe, CpfCnpjPipe, IeRgPipe],
  imports: [
    CommonModule
  ],
  exports: [TelefonePipe, CepPipe, CpfCnpjPipe, IeRgPipe]
})
export class SharedModule { }
