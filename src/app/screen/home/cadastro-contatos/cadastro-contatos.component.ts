import { Component, OnInit, ViewChild } from '@angular/core';
import { Contato } from '../../../models/contato';
import { ContatoService } from '../../../services/contato.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Query } from 'src/app/models/query';

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

  constructor(private contatoService: ContatoService, private router: Router) { }

  ngOnInit(): void {
    this.getContatos();
  }

  getContatos(): void {
    let query: Query = {
      page: 0,
      pageCount: 10,
      searchValue: '',
      deleted: false,
    };

    this.contatoService
      .getContatos(query)
      .subscribe((contatos) => (this.contatos = contatos), (error) => console.log(error));
  }

  new(){
    this.router.navigate(['/home/contatos/0'])
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
