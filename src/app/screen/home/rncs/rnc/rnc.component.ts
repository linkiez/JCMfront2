import { Component } from '@angular/core';
import { RNC } from 'src/app/models/rnc';

@Component({
  selector: 'app-rnc',
  templateUrl: './rnc.component.html',
  styleUrls: ['./rnc.component.scss']
})
export class RNCComponent {

  rnc: RNC = {
    status: 'Aberto',
  }

  status: {valor: string}[] = [{valor:'Aberto'}, {valor:'Fechado'}]

}
