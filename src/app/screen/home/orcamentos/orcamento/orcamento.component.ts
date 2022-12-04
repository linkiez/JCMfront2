import { Component, OnInit } from '@angular/core';
import { Orcamento } from 'src/app/models/orcamento';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  orcamento: Orcamento = {status: ''}

  status: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
