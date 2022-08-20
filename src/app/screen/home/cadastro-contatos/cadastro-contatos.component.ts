import { Component, OnInit, ViewChild } from '@angular/core';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-cadastro-contatos',
  templateUrl: './cadastro-contatos.component.html',
  styleUrls: ['./cadastro-contatos.component.scss']
})
export class CadastroContatosComponent implements OnInit {

  @ViewChild('dt') dt: Table | undefined;

  contatos: Array<Contato> = []

  first = 0;

  rows = 10;

  constructor(private contatoService: ContatoService) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.contatoService
      .getProdutos()
      .subscribe((contatos) => (this.contatos = contatos), (error) => console.log(error));
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.contatos
      ? this.first === this.contatos.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.contatos ? this.first === 0 : true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
}
}
